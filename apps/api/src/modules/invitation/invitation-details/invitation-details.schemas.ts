import { createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";
import * as schema from "@/infra/database/schema";

const invitation = createSelectSchema(schema.invitations);

export const invitationDetailsSchema = defineSchema({
  params: t.Object({
    invitationId: t.String(),
  }),
  response: {
    200: t.Intersect([
      invitation,
      t.Object({
        organizations: t.Object({
          name: t.String(),
          logo: t.Nullable(t.String()),
        }),
        users: t.Object({
          name: t.String(),
          email: t.String(),
          image: t.Nullable(t.String()),
        }),
      }),
    ]),
  },
  detail: {
    tags: ["Invitation"],
    summary: "Invitation details",
  },
});

export namespace InvitationDetailsSchema {
  export type GetParams = Static<typeof invitationDetailsSchema.params>;
  export type GetResponse = Static<
    (typeof invitationDetailsSchema.response)[200]
  >;
}
