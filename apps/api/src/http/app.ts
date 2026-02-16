import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import { Elysia, t } from "elysia";
import { OpenAPI } from "@/http/plugins/better-auth";
import { membersRoutes } from "@backend/http/routes/members";
import { uploadLogo } from "@backend/http/routes/upload-logo";
import { testRout } from "@backend/http/routes/test";
import { inviteMemberRoute } from "./routes/invite-member";
import { sseConnection } from "./plugins/sse";

export const app = new Elysia()
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    })
  )
  .use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      origin: "http://localhost:5173",
    })
  )
  .use(sseConnection)
  .use(uploadLogo)
  .use(inviteMemberRoute)
  .use(membersRoutes)
  .use(testRout);

export type App = typeof app;
