import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const createOrganizationSchema = defineSchema({
  body: t.Object({
    name: t.String({ minLength: 1 }),
    slug: t.String({ minLength: 1 }),
    description: t.String({ minLength: 1 }),
    phone: t.String({ minLength: 1 }),
    state: t.String({ minLength: 1 }),
    city: t.String({ minLength: 1 }),
    district: t.String({ minLength: 1 }),
    street: t.String({ minLength: 1 }),
    number: t.String({ minLength: 1 }),
    location: t.Object({
      x: t.Number(),
      y: t.Number(),
    }),
    complement: t.Optional(t.String()),
    postalCode: t.Optional(t.String()),
    logo: t.Optional(t.File()),
  }),
  response: {
    200: t.Object({
      message: t.String(),
      created: t.Boolean(),
    }),
  },
});

export namespace CreateOrganizationSchema {
  export type GetParams = Static<typeof createOrganizationSchema.body>;
  export type GetResponse = Static<
    (typeof createOrganizationSchema.response)[200]
  >;
}
