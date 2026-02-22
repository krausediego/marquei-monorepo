import { appEnv } from "@backend/infra";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infra/database/schema/**",
  out: "./src/infra/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: appEnv.DATABASE_URL,
  },
  casing: "snake_case",
});
