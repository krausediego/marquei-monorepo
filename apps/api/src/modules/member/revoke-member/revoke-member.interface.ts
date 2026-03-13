import type { RevokeMemberSchema } from ".";

export interface IRevokeMember {
  run(params: RevokeMember.Params): Promise<RevokeMember.Response>;
}

export namespace RevokeMember {
  export type Params = RevokeMemberSchema.GetParams & {
    userId: string;
    organizationId: string;
    traceId: string;
  };

  export type Response = RevokeMemberSchema.GetResponse;
}
