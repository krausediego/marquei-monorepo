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
  export type getParams = Static<typeof acceptInvitationSchema.body>;
  export type getResponse = Static<
    (typeof acceptInvitationSchema.response)[200]
  >;
}
