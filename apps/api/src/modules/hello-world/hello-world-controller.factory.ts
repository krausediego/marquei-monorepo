import type { IController } from "@/modules/shared";
import { HelloWorldController, makeHelloWorldService } from ".";

export const makeHelloWorldController = (): IController => {
  return new HelloWorldController(makeHelloWorldService);
};
