import type { Context } from "elysia";
import type { IMiddleware } from "@/modules/shared";

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (ctx: Context & { traceId?: string; [key: string]: any }) => {
    const data = {
      // passa os headers como objeto simples — o middleware converte para Headers nativo
      ...Object.fromEntries(ctx.request.headers.entries()),
      accessToken: ctx.request.headers.get("x-access-token"),
      body: (ctx.body as object) ?? {},
      params: (ctx.params as object) ?? {},
      query: (ctx.query as object) ?? {},
    };

    const httpResponse = await middleware.handle({
      data,
      method: ctx.request.method,
      path: ctx.path,
      locals: ctx.traceId ? { traceId: ctx.traceId } : {},
    });

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      const validEntries = Object.entries(httpResponse?.body ?? {}).filter(
        ([, value]) => value
      );

      Object.assign(ctx, Object.fromEntries(validEntries));
      return;
    }

    ctx.set.status = httpResponse.statusCode;

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
  };
};
