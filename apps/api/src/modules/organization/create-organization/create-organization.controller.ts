import { auth, getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { CreateOrganizationSchema, ICreateOrganization } from ".";

type CreateOrganizationHandler = () => ICreateOrganization;
export class CreateOrganizationController implements IController {
  constructor(
    private readonly createOrganizationService: CreateOrganizationHandler
  ) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<CreateOrganizationSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const { organizationId, ...content } =
        await this.createOrganizationService().run({
          organization: data,
          user: locals.user,
          traceId: locals.traceId,
        });

      await auth.api.setActiveOrganization({
        body: {
          organizationId,
        },
        headers: locals.headers,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
