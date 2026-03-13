import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IRevokeMember, RevokeMemberSchema } from ".";

type RevokeMemberHandler = () => IRevokeMember;

export class RevokeMemberController implements IController {
  constructor(private readonly revokeMemberService: RevokeMemberHandler) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<RevokeMemberSchema.GetParams>): Promise<Http.IResponse> {
    console.log("CHEGOU AQUI");
    try {
      const content = await this.revokeMemberService().run({
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
