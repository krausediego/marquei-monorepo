import type { ListInvitationsSchema } from ".";

export interface IListInvitations {
  run(params: ListInvitations.Params): Promise<ListInvitations.Response>;
}

export namespace ListInvitations {
  export type Params = ListInvitationsSchema.getParams & {
    organizationId: string;
    userId: string;
    traceId: string;
  };

  export type Response = ListInvitationsSchema.getResponse;
}
