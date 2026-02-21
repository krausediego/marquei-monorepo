import { makeLogging } from "@/infra";
import type { IMiddleware } from "@/modules/shared";
import { AuthClientMiddleware } from "./auth-client.middleware";

export const makeAuthClientMiddleware = (): IMiddleware => {
  return new AuthClientMiddleware(makeLogging());
};
