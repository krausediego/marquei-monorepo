import { and, eq, exists } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { FindAllOrganizations, IFindAllOrganizations } from ".";

export class FindAllOrganizationsService
  extends BaseService
  implements IFindAllOrganizations
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    userId,
  }: FindAllOrganizations.Params): Promise<FindAllOrganizations.Response> {
    this.log("info", "Fetching organizations for user", { userId });

    const organizations = await db
      .select()
      .from(schema.organizations)
      .where(
        exists(
          db
            .select()
            .from(schema.members)
            .where(
              and(
                eq(schema.members.organizationId, schema.organizations.id),
                eq(schema.members.userId, userId)
              )
            )
        )
      );

    this.log("info", "Organizations fetched successfully", {
      userId,
      count: organizations.length,
    });

    return {
      data: organizations,
    };
  }
}
