import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const helloWorldGetSchema = defineSchema({
  params: t.Object({
    message: t.String({ minLength: 1 }),
  }),
  response: {
    200: t.Object({
      message: t.String(),
    }),
  },
});

export namespace HelloWorldSchema {
  export type GetParams = Static<typeof helloWorldGetSchema.params>;
  export type GetResponse = Static<(typeof helloWorldGetSchema.response)[200]>;
}
