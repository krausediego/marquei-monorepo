import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IListOrganizations } from ".";

type ListOrganizationsHandler = () => IListOrganizations;

export class ListOrganizationsController implements IController {
  constructor(
    private readonly listOrganizationsService: ListOrganizationsHandler
  ) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.listOrganizationsService().run({
        userId: locals.user.id,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
