import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IUpdateOrganization, UpdateOrganizationSchema } from ".";

type UpdateOrganizationHandler = () => IUpdateOrganization;
export class UpdateOrganizationController implements IController {
  constructor(
    private readonly updateOrganizationService: UpdateOrganizationHandler
  ) {}
  async handle({
    data,
    locals,
  }: Http.IRequest<UpdateOrganizationSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const response = await this.updateOrganizationService().run({
        ...data,
        traceId: locals.traceId,
        userId: locals.user.id,
      });

      return ok({ ...response });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
