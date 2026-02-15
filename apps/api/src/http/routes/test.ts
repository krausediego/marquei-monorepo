import Elysia, { t } from "elysia";

export const testRout = new Elysia().get(
  "/teste",
  () => {
    return "a";
  },
  {
    response: {
      200: t.String(),
    },
  }
);
