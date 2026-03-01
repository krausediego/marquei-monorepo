import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const acceptInvitationSchema = defineSchema({
  body: t.Object({
    invitationId: t.String(),
  }),
  response: {
    200: t.Object({
      message: t.String(),
      accepted: t.Boolean(),
    }),
  },
  detail: {
    tags: ["Invitation"],
    summary: "Accept invitation",
  },
});

export namespace AcceptInvitationSchema {
  export type GetParams = Static<typeof acceptInvitationSchema.body>;
  export type GetResponse = Static<
    (typeof acceptInvitationSchema.response)[200]
  >;
}
