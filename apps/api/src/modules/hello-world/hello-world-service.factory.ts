import { makeLogging } from "@/infra";
import { HelloWorldService, type IHelloWorld } from ".";

export const makeHelloWorldService = (): IHelloWorld => {
  return new HelloWorldService(makeLogging());
};
