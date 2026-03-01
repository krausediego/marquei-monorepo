import type { RejectInvitationSchema } from ".";

export interface IRejectInvitation {
  run(params: RejectInvitation.Params): Promise<RejectInvitation.Response>;
}

export namespace RejectInvitation {
  export type Params = RejectInvitationSchema.GetParams & {
    userId: string;
    traceId: string;
  };

  export type Response = RejectInvitationSchema.GetResponse;
}
