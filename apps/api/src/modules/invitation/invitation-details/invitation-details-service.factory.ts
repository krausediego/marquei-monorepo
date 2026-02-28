import { makeLogging } from "@/infra";
import { InvitationDetailsService, type IInvitationDetails } from ".";

export const makeInvitationDetailsService = (): IInvitationDetails => {
  return new InvitationDetailsService(makeLogging());
};
