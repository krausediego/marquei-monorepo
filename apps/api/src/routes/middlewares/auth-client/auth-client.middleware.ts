import { auth } from "@/auth";
import {
  ForbiddenError,
  getHttpError,
  type Http,
  type ILoggingManager,
  ok,
} from "@/infra";
import type { IMiddleware } from "@/modules/shared";

export class AuthClientMiddleware implements IMiddleware {
  constructor(private readonly logger: ILoggingManager) {}

  async handle({ data, locals }: Http.IRequest): Promise<Http.IResponse> {
    const { traceId } = locals;
    const headers = new Headers();

    Object.entries(data ?? {}).forEach(([key, value]) => {
      if (typeof value === "string") headers.set(key, value);
    });

    const session = await auth.api.getSession({ headers });

    if (!session) {
      this.logger.error({ traceId }, "Unauthorized");
      return getHttpError(new ForbiddenError("Unauthorized"));
    }

    return ok({
      ...session,
    });
  }
}
