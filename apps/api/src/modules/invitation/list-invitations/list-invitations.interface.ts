import type { ListInvitationsSchema } from ".";

export interface IListInvitations {
  run(params: ListInvitations.Params): Promise<ListInvitations.Response>;
}

export namespace ListInvitations {
  export type Params = ListInvitationsSchema.GetParams & {
    organizationId: string;
    userId: string;
    traceId: string;
  };

  export type Response = ListInvitationsSchema.GetResponse;
}
