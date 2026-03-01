import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IListInvitations, ListInvitationsSchema } from ".";

type ListInvitationsHandler = () => IListInvitations;

export class ListInvitationsController implements IController {
  constructor(
    private readonly listInvitationsService: ListInvitationsHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<ListInvitationsSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.listInvitationsService().run({
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
