import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IInviteUser, InviteUserSchema } from ".";

type InviteUserHandler = () => IInviteUser;
export class InviteUserController implements IController {
  constructor(private readonly inviteUserService: InviteUserHandler) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<InviteUserSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.inviteUserService().run({
        ...data,
        userId: locals.user.id,
        organizationId: locals.organizationId,
        traceId: locals.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
