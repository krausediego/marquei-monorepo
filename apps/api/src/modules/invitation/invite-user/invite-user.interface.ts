import type { InviteUserSchema } from ".";

export interface IInviteUser {
  run(params: InviteUser.Params): Promise<InviteUser.Response>;
}

export namespace InviteUser {
  export type Params = InviteUserSchema.GetParams & {
    userId: string;
    organizationId: string;
    traceId: string;
  };

  export type Response = InviteUserSchema.GetResponse;
}
