import { createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { cursorPaginatedResponse, cursorQuery } from "@/helpers";
import { defineSchema } from "@/infra";
import * as schema from "@/infra/database/schema";

const notification = createSelectSchema(schema.notifications);

export const listNotificationsSchema = defineSchema({
  query: cursorQuery,
  response: {
    200: cursorPaginatedResponse(notification),
  },
  detail: {
    tags: ["Notification"],
    summary: "List notifications",
  },
});

export namespace ListNotificationsSchema {
  export type getParams = Static<typeof listNotificationsSchema.query>;
  export type getResponse = Static<
    (typeof listNotificationsSchema.response)[200]
  >;
}
