import type { IController } from "@/modules/shared";
import { ListUsersController, makeListUsersService } from ".";

export const makeListUsersController = (): IController => {
  return new ListUsersController(makeListUsersService);
};
