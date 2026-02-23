import { createSelectSchema } from "drizzle-typebox";
import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";
import * as schema from "@/infra/database/schema";

const Organization = createSelectSchema(schema.organizations);

export const findAllOrganizationsSchema = defineSchema({
  response: {
    200: t.Object({
      data: t.Array(Organization),
    }),
  },
  detail: {
    tags: ["Organization"],
    summary: "Find all organizations",
  },
});

export namespace FindAllOrganizationsSchema {
  export type GetResponse = Static<
    (typeof findAllOrganizationsSchema.response)[200]
  >;
}
