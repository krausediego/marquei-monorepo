import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService } from "@/modules/shared";
import type { HelloWorld, IHelloWorld } from ".";

export class HelloWorldService extends BaseService implements IHelloWorld {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  run({ message }: HelloWorld.Params): HelloWorld.Response {
    this.log("debug", `Execute request this message: ${message}`);

    return { message };
  }
}
