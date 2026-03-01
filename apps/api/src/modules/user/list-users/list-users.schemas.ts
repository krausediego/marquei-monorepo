import { createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { paginatedResponse, paginationQuery } from "@/helpers";
import { defineSchema } from "@/infra";
import * as schema from "@/infra/database/schema";

const User = createSelectSchema(schema.users);

const UserWithRole = t.Intersect([User, t.Object({ role: t.String() })]);

export const listUsersSchema = defineSchema({
  response: {
    200: paginatedResponse(UserWithRole),
  },
  query: paginationQuery,
  detail: {
    tags: ["Users"],
    summary: "Find all users",
  },
});

export namespace ListUsersSchema {
  export type GetParams = Static<typeof paginationQuery>;
  export type GetResponse = Static<(typeof listUsersSchema.response)[200]>;
}
