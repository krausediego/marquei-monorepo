import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const inviteUserSchema = defineSchema({
  body: t.Object({
    email: t.String({ format: "email" }),
  }),
  response: {
    200: t.Object({
      message: t.String(),
      invited: t.Boolean(),
    }),
  },
  detail: {
    tags: ["Invitation"],
    summary: "Invite user",
  },
});

export namespace InviteUserSchema {
  export type GetParams = Static<typeof inviteUserSchema.body>;
  export type GetResponse = Static<(typeof inviteUserSchema.response)[200]>;
}
