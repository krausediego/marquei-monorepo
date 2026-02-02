import { app } from "./app";

const server = app.listen(3333);

console.log(`🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`);
