import { count, eq } from "drizzle-orm";
import {
  buildPaginationMeta,
  getPaginationOffset,
  setTraceId,
} from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IListInvitations, ListInvitations } from ".";

export class ListInvitationsService
  extends BaseService
  implements IListInvitations
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    userId,
    organizationId,
    page,
    limit,
  }: ListInvitations.Params): Promise<ListInvitations.Response> {
    this.log("info", "Listing invitations", {
      userId,
      organizationId,
      page,
      limit,
    });

    this.log("info", "Checking if user is a member of the organization", {
      userId,
      organizationId,
    });

    const user = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.userId, userId),
          eq(fields.organizationId, organizationId)
        );
      },
    });

    console.log("userId", userId);
    console.log("organizationId", organizationId);

    if (!user) {
      this.log("warn", "User is not a member of the organization", {
        userId,
        organizationId,
      });
      throw new BadRequestError(
        "Este usuário não faz parte do estabelecimento"
      );
    }

    this.log("info", "Member found, checking role permissions", {
      memberId: user.id,
      role: user.role,
    });

    if (!["owner", "admin"].includes(user.role)) {
      this.log("warn", "User does not have permission to list invitations", {
        memberId: user.id,
        role: user.role,
      });
      throw new BadRequestError("Sem permissão");
    }

    const { offset, ...pagination } = getPaginationOffset(page, limit);

    this.log("info", "Fetching invitations", {
      organizationId,
      page: pagination.page,
      limit: pagination.limit,
      offset,
    });

    const where = eq(schema.invitations.organizationId, organizationId);

    const [data, [{ total }]] = await Promise.all([
      db.query.invitations.findMany({
        where() {
          return where;
        },
        limit: pagination.limit,
        offset,
        orderBy(fields, { asc }) {
          return asc(fields.createdAt);
        },
      }),
      db.select({ total: count() }).from(schema.invitations).where(where),
    ]);

    this.log("info", "Invitations fetched successfully", {
      organizationId,
      total,
      returned: data.length,
      page: pagination.page,
      limit: pagination.limit,
    });

    return {
      data,
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }
}
