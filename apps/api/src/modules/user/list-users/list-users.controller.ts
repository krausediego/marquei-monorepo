import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IListUsers, ListUsersSchema } from ".";

type ListUsersHandler = () => IListUsers;

export class ListUsersController implements IController {
  constructor(private readonly listUsersService: ListUsersHandler) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<ListUsersSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.listUsersService().run({
        ...data,
        organizationId: locals.organizationId,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
