import { treaty } from "@elysiajs/eden";
import type { App } from "../../../api/src/http/app";

export const client = treaty<App>("localhost:3333", {
  fetch: {
    credentials: "include",
  },
});
