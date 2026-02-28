import { makeLogging } from "@/infra";
import { ListNotificationsService, type IListNotifications } from ".";

export const makeListNotificationsService = (): IListNotifications => {
  return new ListNotificationsService(makeLogging());
};
