import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { DeleteInvitationSchema, IDeleteInvitation } from ".";

type DeleteInvitationHandler = () => IDeleteInvitation;

export class DeleteInvitationController implements IController {
  constructor(
    private readonly deleteInvitationService: DeleteInvitationHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<DeleteInvitationSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.deleteInvitationService().run({
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
