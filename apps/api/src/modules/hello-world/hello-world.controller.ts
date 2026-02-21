import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IHelloWorld } from ".";

type HelloWorldHandler = () => IHelloWorld;
export class HelloWorldController implements IController {
  constructor(private readonly helloWorldService: HelloWorldHandler) {}

  async handle({ data, locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.helloWorldService().run({
        message: data?.message,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
