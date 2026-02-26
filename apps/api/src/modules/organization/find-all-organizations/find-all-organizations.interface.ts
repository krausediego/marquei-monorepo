import type { FindAllOrganizationsSchema } from ".";

export type IFindAllOrganizations = {
  run(
    params: FindAllOrganizations.Params
  ): Promise<FindAllOrganizations.Response>;
};

export namespace FindAllOrganizations {
  export type Params = {
    userId: string;
    traceId: string;
  };

  export type Response = FindAllOrganizationsSchema.GetResponse;
}
