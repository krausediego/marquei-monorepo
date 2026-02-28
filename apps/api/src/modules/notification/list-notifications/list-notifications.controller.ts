import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IListNotifications, ListNotificationsSchema } from ".";

type ListNotificationsHandler = () => IListNotifications;

export class ListNotificationsController implements IController {
  constructor(
    private readonly listNotificationsService: ListNotificationsHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<ListNotificationsSchema.getParams>): Promise<Http.IResponse> {
    try {
      const content = await this.listNotificationsService().run({
        ...data,
        userId: locals.user.id,
        organizationId: locals.organizationId,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
