import type { ListOrganizationsSchema } from ".";

export interface IListOrganizations {
  run(params: ListOrganizations.Params): Promise<ListOrganizations.Response>;
}

export namespace ListOrganizations {
  export type Params = {
    userId: string;
    traceId: string;
  };

  export type Response = ListOrganizationsSchema.GetResponse;
}
