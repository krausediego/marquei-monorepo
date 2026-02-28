import { gt } from "drizzle-orm";
import { buildCursorMeta, getCursorLimit, setTraceId } from "@/helpers";
import { db, type ILoggingManager } from "@/infra";
import { BaseService } from "@/modules/shared";
import type { IListNotifications, ListNotifications } from ".";

export class ListNotificationsService
  extends BaseService
  implements IListNotifications
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run(
    params: ListNotifications.Params
  ): Promise<ListNotifications.Response> {
    this.log("info", "Starting process list-notifications");

    const data = await db.query.notifications.findMany({
      where(fields, { and, eq, lt, or, isNull }) {
        return and(
          or(
            eq(fields.userId, params.userId),
            eq(fields.organizationId, params.organizationId)
          ),
          or(isNull(fields.expiresAt), gt(fields.expiresAt, new Date())),
          params.cursor ? lt(fields.id, params.cursor) : undefined
        );
      },
      orderBy(fields, { desc }) {
        return desc(fields.createdAt);
      },
      limit: getCursorLimit(params.limit),
    });

    return buildCursorMeta(data, params.limit);
  }
}
