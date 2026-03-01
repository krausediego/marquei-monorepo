import type { DeleteInvitationSchema } from ".";

export interface IDeleteInvitation {
  run(params: DeleteInvitation.Params): Promise<DeleteInvitation.Response>;
}

export namespace DeleteInvitation {
  export type Params = DeleteInvitationSchema.GetParams & {
    organizationId: string;
    userId: string;
    traceId: string;
  };

  export type Response = DeleteInvitationSchema.GetResponse;
}
