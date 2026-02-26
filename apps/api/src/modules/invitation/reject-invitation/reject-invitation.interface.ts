import type { RejectInvitationSchema } from ".";

export interface IRejectInvitation {
  run(params: RejectInvitation.Params): Promise<RejectInvitation.Response>;
}

export namespace RejectInvitation {
  export type Params = RejectInvitationSchema.getParams & {
    userId: string;
    traceId: string;
  };

  export type Response = RejectInvitationSchema.getResponse;
}
