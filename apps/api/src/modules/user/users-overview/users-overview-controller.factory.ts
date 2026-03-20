import type { IController } from "@/modules/shared";
import { UsersOverviewController, makeUsersOverviewService } from ".";

export const makeUsersOverviewController = (): IController => {
  return new UsersOverviewController(makeUsersOverviewService);
};
