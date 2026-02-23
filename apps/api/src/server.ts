import type { App } from "./app";
import { appEnv } from "./infra";

class ServerSetup {
  private app!: App;

  async start() {
    this.app = (await import("./app")).default;

    await this.app.setupPlugins();
    await this.app.setupRoutes();

    this.app.listen(Number(appEnv.PORT));
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
