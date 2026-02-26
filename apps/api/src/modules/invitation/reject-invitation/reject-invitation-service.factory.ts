import { makeLogging } from "@/infra";
import { type IRejectInvitation, RejectInvitationService } from ".";

export const makeRejectInvitationService = (): IRejectInvitation => {
  return new RejectInvitationService(makeLogging());
};
