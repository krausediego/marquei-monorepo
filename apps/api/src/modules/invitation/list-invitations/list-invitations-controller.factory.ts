import type { IController } from "@/modules/shared";
import { ListInvitationsController, makeListInvitationsService } from ".";

export const makeListInvitationsController = (): IController => {
  return new ListInvitationsController(makeListInvitationsService);
};
