import type { AcceptInvitationSchema } from ".";

export interface IAcceptInvitation {
  run(params: AcceptInvitation.Params): Promise<AcceptInvitation.Response>;
}

export namespace AcceptInvitation {
  export type Params = AcceptInvitationSchema.GetParams & {
    userId: string;
    traceId: string;
  };

  export type Response = AcceptInvitationSchema.GetResponse;
}
