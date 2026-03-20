import { and, count, eq, ne } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IUsersOverview, UsersOverview } from ".";

export class UsersOverviewService
  extends BaseService
  implements IUsersOverview
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    organizationId,
  }: UsersOverview.Params): Promise<UsersOverview.Response> {
    this.log("info", "Starting process users-overview");

    const [[{ totalMembers }], [{ totalAdmins }], [{ pendingInvitations }]] =
      await Promise.all([
        db
          .select({ totalMembers: count() })
          .from(schema.members)
          .where(eq(schema.members.organizationId, organizationId)),

        db
          .select({ totalAdmins: count() })
          .from(schema.members)
          .where(
            and(
              eq(schema.members.organizationId, organizationId),
              eq(schema.members.role, "admin")
            )
          ),

        db
          .select({ pendingInvitations: count() })
          .from(schema.invitations)
          .where(
            and(
              ne(schema.invitations.status, "accepted"),
              eq(schema.invitations.organizationId, organizationId)
            )
          ),
      ]);

    return {
      totalMembers,
      totalAdmins,
      pendingInvitations,
    };
  }
}
