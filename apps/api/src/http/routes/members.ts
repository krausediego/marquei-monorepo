import { createSelectSchema } from "drizzle-typebox";
import Elysia, { t } from "elysia";
import { getMembersFunction } from "@/app/functions/get-members";
import * as schema from "@/database/schema";
import { betterAuthPlugin } from "../plugins/better-auth";

const memberSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  emailVerified: t.Boolean(),
  image: t.Nullable(t.String()),
  stripeCustomerId: t.Nullable(t.String()),
  role: t.String(),
  createdAt: t.Date(), // Dates são serializadas como strings no JSON
  updatedAt: t.Date(),
});

export const membersRoutes = new Elysia().use(betterAuthPlugin).get(
  "/members",
  async ({ organizationId, query }) => {
    const response = await getMembersFunction({
      organizationId,
      ...query,
    });

    return response;
  },
  {
    organization: true,
    query: t.Object({
      search: t.Optional(t.String()),
      orderBy: t.Optional(t.Union([t.Literal("name"), t.Literal("createdAt")])),
      orderDirection: t.Optional(
        t.Union([t.Literal("asc"), t.Literal("desc")])
      ),
      page: t.Optional(t.Numeric({ default: 1 })),
      limit: t.Optional(t.Numeric({ default: 20 })),
    }),
    response: {
      200: t.Array(memberSchema),
    },
    detail: {
      tags: ["Organization"],
      summary: "Find all members of organization",
    },
  }
);
