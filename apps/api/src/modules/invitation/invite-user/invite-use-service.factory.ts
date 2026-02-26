import { makeLogging } from "@/infra";
import { type IInviteUser, InviteUserService } from ".";

export const makeInviteUserService = (): IInviteUser => {
  return new InviteUserService(makeLogging());
};
