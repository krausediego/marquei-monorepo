import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IFindAllOrganizations } from ".";

type FindAllOrganizationsHandler = () => IFindAllOrganizations;
export class FindAllOrganizationsController implements IController {
  constructor(
    private readonly findAllOrganizationsService: FindAllOrganizationsHandler
  ) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.findAllOrganizationsService().run({
        userId: locals.user.id,
        traceId: locals.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
