import type { PaginationQuery } from "@/helpers";
import type { FindAllUsersSchema } from ".";

export interface IFindAllUsers {
  run(params: FindAllUsers.Params): Promise<FindAllUsers.Response>;
}

export namespace FindAllUsers {
  export type Params = PaginationQuery & {
    organizationId: string;
    traceId: string;
  };

  export type Response = FindAllUsersSchema.GetResponse;
}
