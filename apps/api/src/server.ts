import type { App } from "./app";
import { env } from "./env";

class ServerSetup {
  private app!: App;

  async start() {
    this.app = (await import("./app")).default;

    await this.app.setupPlugins().setupRoutes();

    this.app.listen(Number(env.PORT));
  }

  async stop() {
    process.exitCode = 1;
  }
}

const serviceSetup = new ServerSetup();
serviceSetup.start();

process.on("SIGTERM", async () => {
  await serviceSetup.stop();
});
