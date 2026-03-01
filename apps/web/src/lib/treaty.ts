import type { AppType } from "@backend/appTypes";
import { treaty } from "@elysiajs/eden";

export const client = treaty<AppType>("http://localhost:3333");
