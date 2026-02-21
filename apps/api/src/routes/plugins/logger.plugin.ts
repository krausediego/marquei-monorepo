import { randomUUIDv7 } from "bun";
import Elysia from "elysia";
import { makeLogging } from "@/infra";

const loggingManager = makeLogging();

export const loggerPlugin = new Elysia({ name: "logger" })
  .derive({ as: "global" }, ({ request, set }) => {
    const traceId = request.headers.get("x-trace-id") ?? randomUUIDv7();

    set.headers["x-trace-id"] = traceId;

    return { traceId, loggingManager };
  })
  .trace(async ({ onHandle, onAfterHandle, onError, context }) => {
    const traceId =
      context.request.headers.get("x-trace-id") ?? crypto.randomUUID();

    loggingManager.writeLog("debug", "[trace] request received", {
      traceId,
      method: context.request.method,
      path: context.path,
    });

    onHandle(({ onStop }) => {
      loggingManager.writeLog("debug", "[trace] handler started", { traceId });

      onStop(({ elapsed, error }) => {
        if (error) {
          loggingManager.writeLog("error", "[trace] handler failed", {
            traceId,
            elapsed,
            error: error.message,
          });
          return;
        }

        loggingManager.writeLog("info", "[trace] handler completed", {
          traceId,
          elapsed,
        });
      });
    });

    onAfterHandle(({ onStop }) => {
      onStop(({ elapsed }) => {
        loggingManager.writeLog("debug", "[trace] response sent", {
          traceId,
          elapsed,
        });
      });
    });

    onError(({ onStop }) => {
      onStop(({ error }) => {
        loggingManager.writeLog("error", "[trace] unhandled error", {
          traceId,
          error: error?.message,
        });
      });
    });
  });
