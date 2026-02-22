import { CreateOrganizationSchema } from "./create-organization.schema";

export interface ICreateOrganization {
  run(params: CreateOrganization.Params): Promise<CreateOrganization.Response>;
}

export namespace CreateOrganization {
  export type Params = CreateOrganizationSchema.GetParams;

  export type Response = CreateOrganizationSchema.GetResponse;
}
