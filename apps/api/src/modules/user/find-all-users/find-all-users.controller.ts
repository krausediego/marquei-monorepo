import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { FindAllUsersSchema, IFindAllUsers } from ".";

type FindAllUsersHandler = () => IFindAllUsers;
export class FindAllUsersController implements IController {
  constructor(private readonly findAllUsersService: FindAllUsersHandler) {}

  async handle({
    data,
    locals,
  }: Http.IRequest<FindAllUsersSchema.GetQuery>): Promise<Http.IResponse> {
    try {
      const content = await this.findAllUsersService().run({
        ...data,
        organizationId: locals.organizationId,
        traceId: locals.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
