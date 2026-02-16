import Elysia from "elysia";
import { betterAuthPlugin } from "./better-auth";

export const activeConnections = new Map<
  string,
  ReadableStreamDefaultController
>();

export const sseConnection = new Elysia().use(betterAuthPlugin).get(
  "/notifications/stream",
  async ({ session, set }) => {
    const userId = session.userId;

    set.headers = {
      ...set.headers,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    } as any;

    const stream = new ReadableStream({
      start(controller) {
        // Verificar se já tem conexão ativa e fechar
        const existingConnection = activeConnections.get(userId);
        if (existingConnection) {
          try {
            existingConnection.close();
          } catch {}
        }

        activeConnections.set(userId, controller);

        console.log(`User ${userId} conectado ao SSE`);

        controller.enqueue(
          `data: ${JSON.stringify({ type: "connected", userId })}\n\n`
        );

        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(": heartbeat\n\n");
          } catch {
            clearInterval(heartbeat);
          }
        }, 30000);

        return () => {
          clearInterval(heartbeat);
          activeConnections.delete(userId);
          console.log(`User ${userId} desconectado`);
        };
      },
    });

    console.log("entrou aqui");

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  },
  { auth: true }
);
