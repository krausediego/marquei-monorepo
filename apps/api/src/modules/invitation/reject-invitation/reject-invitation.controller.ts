import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IRejectInvitation, RejectInvitationSchema } from ".";

type RejectInvitationHandler = () => IRejectInvitation;

export class RejectInvitationController implements IController {
  constructor(
    private readonly rejectInvitationService: RejectInvitationHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<RejectInvitationSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.rejectInvitationService().run({
        invitationId: data.invitationId,
        userId: locals?.user.id,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
