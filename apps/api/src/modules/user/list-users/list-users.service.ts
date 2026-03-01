import { and, count, eq, ilike } from "drizzle-orm";
import {
  buildPaginationMeta,
  getPaginationOffset,
  setTraceId,
} from "@/helpers";
import { db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IListUsers, ListUsers } from ".";

export class ListUsersService extends BaseService implements IListUsers {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    organizationId,
    page,
    limit,
    search,
  }: ListUsers.Params): Promise<ListUsers.Response> {
    const { offset, ...pagination } = getPaginationOffset(page, limit);

    const where = and(
      eq(schema.members.organizationId, organizationId),
      search ? ilike(schema.users.name, `%${search}%`) : undefined
    );

    this.log("debug", "Fetching users", {
      organizationId,
      ...pagination,
      search,
    });

    const [data, [{ total }]] = await Promise.all([
      db
        .select({
          id: schema.users.id,
          name: schema.users.name,
          email: schema.users.email,
          emailVerified: schema.users.emailVerified,
          image: schema.users.image,
          role: schema.members.role,
          stripeCustomerId: schema.users.stripeCustomerId,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users)
        .innerJoin(schema.members, eq(schema.users.id, schema.members.userId))
        .where(where)
        .limit(pagination.limit)
        .offset(offset)
        .orderBy(schema.users.name),

      db
        .select({ total: count() })
        .from(schema.users)
        .innerJoin(schema.members, eq(schema.users.id, schema.members.userId))
        .where(where),
    ]);

    this.log("info", "Users fetched", { total, ...pagination });

    return {
      data,
      meta: buildPaginationMeta(total, pagination.page, pagination.limit),
    };
  }
}
