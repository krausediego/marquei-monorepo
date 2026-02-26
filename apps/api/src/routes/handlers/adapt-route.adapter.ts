import type { IController } from "@/modules/shared";

export const adaptRoute = (controller: IController) =>
  (async (ctx: any) => {
    const data = {
      ...((ctx.body as object) ?? {}),
      ...((ctx.params as object) ?? {}),
      ...((ctx.query as object) ?? {}),
    };

    const httpResponse = await controller.handle({
      data,
      method: ctx.request.method,
      path: ctx.path,
      locals: {
        traceId: ctx.traceId,
        organizationId: ctx.organizationId ?? ctx.session.activeOrganizationId,
        user: ctx.user,
        headers: ctx.headers,
      },
    });

    ctx.set.status = httpResponse.statusCode;

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return httpResponse.body;
    }

    if (httpResponse?.body instanceof Error) {
      return {
        message: httpResponse.body.message,
        code: httpResponse.code,
      };
    }

    return {
      message: httpResponse.body,
      code: httpResponse.code,
    };
  }) as any;
