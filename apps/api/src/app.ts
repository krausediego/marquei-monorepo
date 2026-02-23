import { globSync } from "node:fs";
import path from "node:path";
import cors from "@elysiajs/cors";
import openapi from "@elysiajs/openapi";
import Elysia from "elysia";
import { auth, type ILoggingManager, makeLogging } from "@/infra";
import { loggerPlugin, OpenAPI, sseConnection } from "@/routes/plugins";

export class App {
  private app: Elysia;

  constructor(private readonly logger: ILoggingManager) {
    this.app = new Elysia();
  }

  async setupPlugins(): Promise<this> {
    this.app.use(
      openapi({
        documentation: {
          components: await OpenAPI.components,
          paths: await OpenAPI.getPaths(),
        },
      })
    );
    this.app.use(
      cors({
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        origin: "http://localhost:5173",
      })
    );
    this.app.use(loggerPlugin);
    this.app.use(sseConnection);
    this.app.mount(auth.handler);
    return this;
  }

  async setupRoutes(): Promise<this> {
    const routesPathPattern = path.resolve(__dirname, "routes/v*");
    const versionFolders = globSync(routesPathPattern);

    for (const versionPath of versionFolders) {
      const version = path.basename(versionPath);

      const routeFiles = globSync(`${versionPath}/*.{js,ts}`, {
        exclude: ["**/*.map"],
      });

      for (const file of routeFiles) {
        const route = await import(file);
        if (route?.default) {
          const versionedPlugin = new Elysia({ prefix: `/api/${version}` }).use(
            route.default
          );

          this.app.use(versionedPlugin);
        }
      }
    }

    return this;
  }

  listen(port: number): this {
    this.app.listen(port, () => {
      this.logger.info(`🦊 Server running at http://localhost:${port}`);
    });

    return this;
  }

  getApp(): Elysia {
    return this.app;
  }
}

export default new App(makeLogging());
