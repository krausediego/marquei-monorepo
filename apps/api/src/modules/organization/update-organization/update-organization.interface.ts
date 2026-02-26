import type { UpdateOrganizationSchema } from ".";

export type IUpdateOrganization = {
  run(params: UpdateOrganization.Params): Promise<UpdateOrganization.Response>;
};

export namespace UpdateOrganization {
  export type Params = UpdateOrganizationSchema.GetParams & {
    traceId: string;
    userId: string;
  };

  export type Response = UpdateOrganizationSchema.GetResponse;
}
