export interface IHelloWorld {
  run(params: HelloWorld.Params): HelloWorld.Response;
}

export namespace HelloWorld {
  export type Params = {
    message: string;
    traceId: string;
  };

  export type Response = {
    message: string;
  };
}
