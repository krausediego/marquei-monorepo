import type { ListNotificationsSchema } from ".";

export interface IListNotifications {
  run(params: ListNotifications.Params): Promise<ListNotifications.Response>;
}

export namespace ListNotifications {
  export type Params = ListNotificationsSchema.GetParams & {
    userId: string;
    organizationId: string;
    traceId: string;
  };

  export type Response = ListNotificationsSchema.GetResponse;
}
