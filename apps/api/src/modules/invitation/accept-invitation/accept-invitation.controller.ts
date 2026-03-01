import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { AcceptInvitationSchema, IAcceptInvitation } from ".";

type AcceptInvitationHandler = () => IAcceptInvitation;

export class AcceptInvitationController implements IController {
  constructor(
    private readonly acceptInvitationService: AcceptInvitationHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<AcceptInvitationSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.acceptInvitationService().run({
        invitationId: data.invitationId,
        userId: locals.user.id,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
