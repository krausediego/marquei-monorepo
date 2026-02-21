import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { appEnv } from "../config";

export const db = drizzle(appEnv.DATABASE_URL, {
  schema,
  casing: "snake_case",
});
