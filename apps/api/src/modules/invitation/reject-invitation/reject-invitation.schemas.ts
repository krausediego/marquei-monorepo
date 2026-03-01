import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const rejectInvitationSchema = defineSchema({
  body: t.Object({
    invitationId: t.String(),
  }),
  response: {
    200: t.Object({
      message: t.String(),
      rejected: t.Boolean(),
    }),
  },
  detail: {
    tags: ["Invitation"],
    summary: "reject invitation",
  },
});

export namespace RejectInvitationSchema {
  export type GetParams = Static<typeof rejectInvitationSchema.body>;
  export type GetResponse = Static<
    (typeof rejectInvitationSchema.response)[200]
  >;
}
