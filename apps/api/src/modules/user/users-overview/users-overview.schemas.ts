import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const usersOverviewSchema = defineSchema({
  response: {
    200: t.Object({
      totalMembers: t.Number(),
      totalAdmins: t.Number(),
      pendingInvitations: t.Number(),
    }),
  },
  detail: {
    tags: [""],
    summary: "",
  },
});

export namespace UsersOverviewSchema {
  export type GetResponse = Static<(typeof usersOverviewSchema.response)[200]>;
}
