import type { IController } from "@/modules/shared";
import { ListNotificationsController, makeListNotificationsService } from ".";

export const makeListNotificationsController = (): IController => {
  return new ListNotificationsController(makeListNotificationsService);
};
