import Elysia from "elysia";
import { listUsersSchema, makeListUsersController } from "@/modules/user";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/user" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeListUsersController()), {
    auth: true,
    query: listUsersSchema.query,
    response: listUsersSchema.response,
    detail: listUsersSchema.detail,
  });
