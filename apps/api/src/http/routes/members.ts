import { createSelectSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { getMembersFunction } from "@/app/functions/get-members";
import * as schema from "@/database/schema";
import { betterAuthPlugin } from "../plugins/better-auth";

const a = createSelectSchema(schema.users);

export const membersRoutes = new Elysia().use(betterAuthPlugin).get(
  "/members",
  async ({ organizationId }) => {
    const response = await getMembersFunction({
      organizationId,
    });

    return response;
  },
  {
    organization: true,
    response: {
      200: t.Array(a),
    },
  }
);
