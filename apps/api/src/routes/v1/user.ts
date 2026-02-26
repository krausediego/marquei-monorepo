import Elysia from "elysia";
import { findAllUsersSchema, makeFindAllUsersController } from "@/modules/user";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/user" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeFindAllUsersController()), {
    auth: true,
    query: findAllUsersSchema.query,
    response: findAllUsersSchema.response,
    detail: findAllUsersSchema.detail,
  });
