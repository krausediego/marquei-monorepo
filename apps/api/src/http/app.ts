import openapi from "@elysiajs/openapi";
import { Elysia, t } from "elysia";
import { OpenAPI } from "@/http/plugins/better-auth";
import cors from "@elysiajs/cors";
import { uploadLogo } from "./routes/upload-logo";

export const app = new Elysia()
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      origin: "http://localhost:5173",
    }),
  )
  .use(uploadLogo);

export type App = typeof app;
