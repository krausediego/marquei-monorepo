import { BaseService } from "@/modules/shared";
import type { CreateOrganization, ICreateOrganization } from ".";
import { ConflictError, db, ILoggingManager } from "@/infra";
import { setTraceId } from "@/helpers";
import { IStorage } from "@/modules/shared/storage";
import * as schema from "@/infra/database/schema";
import { generateUniqueSlug } from "@/helpers";

export class CreateOrganizationService
  extends BaseService
  implements ICreateOrganization
{
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly storage: IStorage
  ) {
    super(logger);
  }

  @setTraceId
  async run({
    organization,
    userId,
  }: CreateOrganization.Params): Promise<CreateOrganization.Response> {
    this.log("info", "Creating organization", {
      name: organization.name,
      phone: organization.phone,
      userId,
    });

    this.log("info", "Checking for existing organization with same phone", {
      phone: organization.phone,
    });

    const hasOrganization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.phone, organization.phone);
      },
    });

    if (hasOrganization) {
      this.log("warn", "Phone already in use by another organization", {
        phone: organization.phone,
        existingOrganizationId: hasOrganization.id,
      });
      throw new ConflictError(
        "Uma ou mais informações fornecidas já estão em uso."
      );
    }

    this.log("info", "Phone is available, proceeding");

    let keyStorage: string | null = null;
    let logoUrl: string | null = null;

    if (organization.logo) {
      const file = organization.logo;

      this.log("info", "Logo provided, uploading to storage", {
        filename: file.name,
        size: file.size,
        contentType: file.type,
      });

      keyStorage = this.storage.generateKey({
        filename: file.name,
        folder: "organization",
      }).key;

      this.log("info", "Storage key generated", { key: keyStorage });

      logoUrl = (
        await this.storage.upload({
          key: keyStorage!,
          contentType: file.type,
          body: Buffer.from(await file.arrayBuffer()),
          metadata: {
            originalFileName: file.name,
            size: String(file.size),
            uploadedAt: new Date().toISOString(),
          },
        })
      ).url;

      this.log("info", "Logo uploaded successfully", {
        key: keyStorage,
        url: logoUrl,
      });
    }

    const slug = generateUniqueSlug(organization.name);

    this.log("info", "Slug generated", { slug });

    try {
      this.log(
        "info",
        "Starting transaction: insert organization and owner member"
      );

      await db.transaction(async (tx) => {
        const [organizationCreated] = await tx
          .insert(schema.organizations)
          .values({
            ...organization,
            slug,
            logo: logoUrl,
            logoKeyStorage: keyStorage,
          })
          .returning({ id: schema.organizations.id });

        this.log("info", "Organization inserted", {
          organizationId: organizationCreated.id,
        });

        await tx.insert(schema.members).values({
          userId,
          organizationId: organizationCreated.id,
          role: "owner",
        });

        this.log("info", "Owner member inserted", {
          organizationId: organizationCreated.id,
          userId,
        });
      });

      this.log("info", "Organization created successfully", { slug, userId });
    } catch (error) {
      this.log("error", "Transaction failed, rolling back storage upload", {
        error: error instanceof Error ? error.message : String(error),
        keyStorage,
      });

      if (keyStorage) {
        this.log("info", "Removing uploaded logo from storage", {
          key: keyStorage,
        });

        await this.storage.delete({ key: keyStorage }).catch((storageError) => {
          this.log(
            "error",
            "Failed to remove logo from storage after transaction error",
            {
              key: keyStorage,
              error:
                storageError instanceof Error
                  ? storageError.message
                  : String(storageError),
            }
          );
        });
      }

      throw error;
    }

    return {
      message: "Estabelecimento criado com sucesso!",
      created: true,
    };
  }
}
