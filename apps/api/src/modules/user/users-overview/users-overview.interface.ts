import type { UsersOverviewSchema } from ".";

export interface IUsersOverview {
  run(params: UsersOverview.Params): Promise<UsersOverview.Response>;
}

export namespace UsersOverview {
  export type Params = {
    organizationId: string;
    traceId: string;
  };

  export type Response = UsersOverviewSchema.GetResponse;
}
