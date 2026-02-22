import { BaseService } from "@/modules/shared";
import type { CreateOrganization, ICreateOrganization } from ".";
import { ConflictError, db, ILoggingManager } from "@/infra";
import { setTraceId } from "@/helpers";
import { IStorage } from "@/modules/shared/storage";
import * as schema from "@/infra/database/schema";
import { generateUniqueSlug } from "@/helpers/generate-slug";

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
    const hasOrganization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.phone, organization.phone);
      },
    });

    if (hasOrganization) {
      throw new ConflictError(
        "Uma ou mais informações fornecidas já estão em uso."
      );
    }

    let keyStorage: string | null = null;
    let logoUrl: string | null = null;
    if (organization.logo) {
      const file = organization.logo;

      keyStorage = this.storage.generateKey({
        filename: file.name,
        folder: "organization",
      }).key;

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
    }

    const slug = generateUniqueSlug(organization.name);

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

      await tx.insert(schema.members).values({
        userId,
        organizationId: organizationCreated.id,
        role: "owner",
      });
    });

    return {
      message: "Estabelecimento criado com sucesso!",
      created: true,
    };
  }
}
