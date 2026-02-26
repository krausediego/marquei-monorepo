import { createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";
import * as schema from "@/infra/database/schema";
import { createOrganizationSchema } from "../create-organization";

const Organization = createSelectSchema(schema.organizations);

export const updateOrganizationSchema = defineSchema({
  params: t.Object({
    id: t.String({ format: "uuid" }),
  }),
  body: createOrganizationSchema.body,
  response: {
    200: t.Object({
      data: t.Array(Organization),
    }),
  },
  detail: {
    tags: ["Organization"],
    summary: "Update organization",
  },
});

export namespace UpdateOrganizationSchema {
  export type GetParams = Static<typeof updateOrganizationSchema.params> &
    Static<typeof updateOrganizationSchema.body>;
  export type GetResponse = Static<
    (typeof updateOrganizationSchema.response)[200]
  >;
}
