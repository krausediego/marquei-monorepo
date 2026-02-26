import type { IController } from "@/modules/shared";
import { FindAllUsersController, makeFindAllUsersService } from ".";

export const makeFindAllUsersController = (): IController => {
  return new FindAllUsersController(makeFindAllUsersService);
};
