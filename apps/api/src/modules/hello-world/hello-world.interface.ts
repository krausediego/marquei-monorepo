import { HelloWorldSchema } from "./hello-world.schemas";

export interface IHelloWorld {
  run(params: HelloWorld.Params): HelloWorld.Response;
}

export namespace HelloWorld {
  export type Params = HelloWorldSchema.GetParams & {
    traceId: string;
  };

  export type Response = HelloWorldSchema.GetResponse;
}
