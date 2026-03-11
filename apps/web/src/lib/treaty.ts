import type { AppType } from "@backend/appTypes";
import { type Treaty, treaty } from "@elysiajs/eden";

export const client = treaty<AppType>("http://localhost:3333", {
  fetch: {
    credentials: "include",
  },
});

export type Client = Treaty.Create<AppType>;
