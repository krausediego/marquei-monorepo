import type { IController } from "@/modules/shared";
import { InviteUserController, makeInviteUserService } from ".";

export const makeInviteUserController = (): IController => {
  return new InviteUserController(makeInviteUserService);
};
