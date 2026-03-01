import { createSelectSchema } from "drizzle-typebox";
import type { Static } from "elysia";
import { paginatedResponse, paginationQuery } from "@/helpers";
import { defineSchema } from "@/infra";
import * as schema from "@/infra/database/schema";

const Invitation = createSelectSchema(schema.invitations);

export const listInvitationsSchema = defineSchema({
  query: paginationQuery,
  response: {
    200: paginatedResponse(Invitation),
  },
  detail: {
    tags: ["Invitation"],
    summary: "List invitations",
  },
});

export namespace ListInvitationsSchema {
  export type GetParams = Static<typeof listInvitationsSchema.query>;
  export type GetResponse = Static<
    (typeof listInvitationsSchema.response)[200]
  >;
}
