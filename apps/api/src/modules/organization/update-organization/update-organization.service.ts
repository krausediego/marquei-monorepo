import { eq } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IStorage } from "@/modules/shared/storage";
import type { IUpdateOrganization, UpdateOrganization } from ".";

export class UpdateOrganizationService
  extends BaseService
  implements IUpdateOrganization
{
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly storage: IStorage
  ) {
    super(logger);
  }

  @setTraceId
  async run({
    id,
    logo,
    userId,
    ...restData
  }: UpdateOrganization.Params): Promise<UpdateOrganization.Response> {
    const organization = await db.query.organizations.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id);
      },
    });

    if (!organization) {
      throw new BadRequestError(
        "Não existe um estabelecimento com o id informado."
      );
    }

    const member = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(eq(fields.organizationId, id), eq(fields.userId, userId));
      },
    });

    if (!member) {
      throw new BadRequestError("Você não é membro deste estabelecimento.");
    }

    if (!["owner"].includes(member.role)) {
      throw new BadRequestError(
        "Você não tem permissão para realizar esta ação."
      );
    }

    let newKeyStorage: string | undefined;
    let newLogoUrl: string | undefined;
    try {
      if (logo && organization.logoKeyStorage) {
        newKeyStorage = this.storage.generateKey({
          filename: organization.slug,
          folder: "organization",
        }).key;

        newLogoUrl = (
          await this.storage.upload({
            key: newKeyStorage!,
            contentType: logo.type,
            body: Buffer.from(await logo.arrayBuffer()),
            metadata: {
              originalFileName: logo.name,
              size: String(logo.size),
              uploadedAt: new Date().toISOString(),
            },
          })
        ).url;
      }

      const oldKeyStorage = organization.logoKeyStorage;

      const organizationUpdated = await db
        .update(schema.organizations)
        .set({
          ...restData,
          logo: newLogoUrl ?? organization.logo,
          logoKeyStorage: newKeyStorage ?? organization.logoKeyStorage,
        })
        .where(eq(schema.organizations.id, id))
        .returning();

      if (oldKeyStorage) {
        await this.storage.delete({ key: oldKeyStorage }).catch((e) => {
          this.log("error", "Failed to remove old logo from storage", {
            key: oldKeyStorage,
            error: e.message,
          });
        });
      }

      return {
        data: organizationUpdated,
      };
    } catch (error: any) {
      if (newKeyStorage) {
        await this.storage.delete({ key: newKeyStorage }).catch((e) => {
          this.log(
            "error",
            "Failed to remove new logo from storage after error",
            {
              key: newKeyStorage,
              error: e.message,
            }
          );
        });
      }

      throw new BadRequestError(error?.message);
    }
  }
}
