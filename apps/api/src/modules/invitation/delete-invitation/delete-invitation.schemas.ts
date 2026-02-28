import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const deleteInvitationSchema = defineSchema({
  params: t.Object({
    invitationId: t.String(),
  }),
  response: {
    200: t.Object({
      message: t.String(),
      deleted: t.Boolean(),
    }),
  },
  detail: {
    tags: ["Invitation"],
    summary: "Delete invitation",
  },
});

export namespace DeleteInvitationSchema {
  export type getParams = Static<typeof deleteInvitationSchema.params>;
  export type getResponse = Static<
    (typeof deleteInvitationSchema.response)[200]
  >;
}
