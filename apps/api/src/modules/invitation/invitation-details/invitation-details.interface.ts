import type { InvitationDetailsSchema } from ".";

export interface IInvitationDetails {
  run(params: InvitationDetails.Params): Promise<InvitationDetails.Response>;
}

export namespace InvitationDetails {
  export type Params = InvitationDetailsSchema.getParams & {
    traceId: string;
  };

  export type Response = InvitationDetailsSchema.getResponse;
}
