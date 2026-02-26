import type { IController } from "@/modules/shared";
import { makeRejectInvitationService, RejectInvitationController } from ".";

export const makeRejectInvitationController = (): IController => {
  return new RejectInvitationController(makeRejectInvitationService);
};
