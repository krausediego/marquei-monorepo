import type { IController } from "@/modules/shared";
import { InvitationDetailsController, makeInvitationDetailsService } from ".";

export const makeInvitationDetailsController = (): IController => {
  return new InvitationDetailsController(makeInvitationDetailsService);
};
