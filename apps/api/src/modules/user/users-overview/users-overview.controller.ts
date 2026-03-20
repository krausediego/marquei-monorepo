import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IUsersOverview } from ".";

type UsersOverviewHandler = () => IUsersOverview;

export class UsersOverviewController implements IController {
  constructor(private readonly usersOverviewService: UsersOverviewHandler) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.usersOverviewService().run({
        organizationId: locals.organizationId,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
