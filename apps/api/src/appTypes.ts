import Elysia from "elysia";

// importa as rotas estaticamente — só para o TypeScript, nunca executado no servidor
import helloWorld from "./routes/v1/hello-world";
import invitation from "./routes/v1/invitation";
import notification from "./routes/v1/notification";
import organization from "./routes/v1/organization";
import user from "./routes/v1/user";

// monta a árvore de tipos exatamente como o setupRoutes faz
const app = new Elysia({ prefix: "/api/v1" })
  .use(helloWorld)
  .use(organization)
  .use(user)
  .use(invitation)
  .use(notification);

export type AppType = typeof app;
