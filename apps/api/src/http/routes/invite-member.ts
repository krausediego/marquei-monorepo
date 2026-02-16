import Elysia, { t } from "elysia";
import { betterAuthPlugin } from "../plugins/better-auth";
import * as schema from "@/database/schema";
import { inviteMembersFunction } from "@/app/functions/invite-member";
import { createSelectSchema } from "drizzle-typebox";

const inviteMembersSchema = createSelectSchema(schema.invitations);

export const inviteMemberRoute = new Elysia().use(betterAuthPlugin).post(
  "/invite",
  async ({ organizationId, session, body: { email } }) => {
    const invite = await inviteMembersFunction({
      organizationId,
      userId: session.userId,
      email,
    });

    return invite;
  },
  {
    organization: true,
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
    response: {
      200: inviteMembersSchema,
    },
    detail: {
      tags: ["Organization"],
      summary: "Send invite to join organization",
    },
  }
);
