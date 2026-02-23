import type * as schema from "@/infra/database/schema";
import type { CreateOrganizationSchema } from "./create-organization.schema";

export interface ICreateOrganization {
  run(params: CreateOrganization.Params): Promise<CreateOrganization.Response>;
}

export namespace CreateOrganization {
  export type Params = {
    organization: CreateOrganizationSchema.GetParams;
    user: typeof schema.users.$inferSelect;
    traceId: string;
  };

  export type Response = CreateOrganizationSchema.GetResponse;
}
