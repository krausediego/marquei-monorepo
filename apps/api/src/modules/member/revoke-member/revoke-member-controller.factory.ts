import type { IController } from "@/modules/shared";
import { makeRevokeMemberService, RevokeMemberController } from ".";

export const makeRevokeMemberController = (): IController => {
  return new RevokeMemberController(makeRevokeMemberService);
};
