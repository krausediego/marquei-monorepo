import { adaptMiddleware } from "@/routes/handlers";
import { makeAuthClientMiddleware } from "./auth-client.factory";

export const authClient = adaptMiddleware(makeAuthClientMiddleware());
