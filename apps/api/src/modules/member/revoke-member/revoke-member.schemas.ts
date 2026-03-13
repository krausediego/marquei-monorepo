import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const revokeMemberSchema = defineSchema({
  params: t.Object({
    id: t.String(),
  }),
  response: {
    200: t.Object({
      message: t.String(),
      revoked: t.Boolean(),
    }),
  },
  detail: {
    tags: ["Member"],
    summary: "Revoke member",
  },
});

export namespace RevokeMemberSchema {
  export type GetParams = Static<typeof revokeMemberSchema.params>;
  export type GetResponse = Static<(typeof revokeMemberSchema.response)[200]>;
}
