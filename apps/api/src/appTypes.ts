import { treaty } from "@elysiajs/eden";
import Elysia from "elysia";

// importa as rotas estaticamente — só para o TypeScript, nunca executado no servidor
import helloWorld from "./routes/v1/hello-world";
import organization from "./routes/v1/organization";

// monta a árvore de tipos exatamente como o setupRoutes faz
const app = new Elysia()
  .use(new Elysia({ prefix: "/api/v1" }).use(helloWorld))
  .use(new Elysia({ prefix: "/api/v1" }).use(organization));

export type AppType = typeof app;

export const client = treaty<AppType>("localhost:3333");

const { data } = await client.api.v1.organization.get();
