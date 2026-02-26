import { generateUniqueSlug, setTraceId } from "@/helpers";
import { appEnv, ConflictError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { OrganizationCreatedEmail } from "@/infra/email-templates";
import { BaseService } from "@/modules/shared";
import type { IEmailSender } from "@/modules/shared/email-sender";
import type { IStorage } from "@/modules/shared/storage";
import type { CreateOrganization, ICreateOrganization } from ".";

export class CreateOrganizationService
  extends BaseService
  implements ICreateOrganization
{
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly storage: IStorage,
    private readonly emailSender: IEmailSender
  ) {
    super(logger);
  }

  @setTraceId
  async run({
    organization,
    user,
  }: CreateOrganization.Params): Promise<CreateOrganization.Response> {
    this.log("info", "Creating organization", {
      name: organization.name,
      phone: organization.phone,
      userId: user.id,
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

    const slug = generateUniqueSlug(organization.name);

    this.log("info", "Slug generated", { slug });

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
        filename: slug,
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

    let organizationId: string | null = null;
    try {
      this.log(
        "info",
        "Starting transaction: insert organization and owner member"
      );

      const { id } = await db.transaction(async (tx) => {
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
          userId: user.id,
          organizationId: organizationCreated.id,
          role: "owner",
        });

        this.log("info", "Owner member inserted", {
          organizationId: organizationCreated.id,
          userId: user.id,
        });

        return organizationCreated;
      });

      organizationId = id;

      this.log("info", "Organization created successfully", {
        slug,
        userId: user.id,
      });
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

    if (appEnv.NODE_ENV !== "development") {
      const { id } = await this.emailSender.sendEmail({
        to: user.email,
        subject: `Seu estabelecimento ${organization.name} foi criado no Marquei.`,
        react: OrganizationCreatedEmail({
          dashboardUrl: appEnv.CLIENT_BASE_URL,
          establishmentName: organization.name,
          userName: user.name,
        }),
      });

      this.log("info", "Created enterprise email send", { id });
    }

    return {
      message: "Estabelecimento criado com sucesso!",
      organizationId,
      created: true,
    };
  }
}
