import type { ListUsersSchema } from ".";

export interface IListUsers {
  run(params: ListUsers.Params): Promise<ListUsers.Response>;
}

export namespace ListUsers {
  export type Params = ListUsersSchema.GetParams & {
    organizationId: string;
    traceId: string;
  };

  export type Response = ListUsersSchema.GetResponse;
}
