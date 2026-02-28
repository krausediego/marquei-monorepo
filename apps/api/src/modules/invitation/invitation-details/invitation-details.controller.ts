import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IInvitationDetails, InvitationDetailsSchema } from ".";

type InvitationDetailsHandler = () => IInvitationDetails;

export class InvitationDetailsController implements IController {
  constructor(
    private readonly invitationDetailsService: InvitationDetailsHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<InvitationDetailsSchema.getParams>): Promise<Http.IResponse> {
    try {
      const content = await this.invitationDetailsService().run({
        ...data,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
