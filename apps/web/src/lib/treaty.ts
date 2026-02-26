import type { AppType } from "@backend/appTypes";
import { treaty } from "@elysiajs/eden";

export const client = treaty<AppType>("localhost:3333", {
  fetch: {
    credentials: "include",
  },
});
