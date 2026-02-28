import type { IController } from "@/modules/shared";
import { DeleteInvitationController, makeDeleteInvitationService } from ".";

export const makeDeleteInvitationController = (): IController => {
  return new DeleteInvitationController(makeDeleteInvitationService);
};
