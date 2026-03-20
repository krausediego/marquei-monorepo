import Elysia from "elysia";
import {
  listUsersSchema,
  makeListUsersController,
  makeUsersOverviewController,
  usersOverviewSchema,
} from "@/modules/user";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/user" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeListUsersController()), {
    auth: true,
    query: listUsersSchema.query,
    response: listUsersSchema.response,
    detail: listUsersSchema.detail,
  })
  .get("/overview", adaptRoute(makeUsersOverviewController()), {
    auth: true,
    response: usersOverviewSchema.response,
    detail: usersOverviewSchema.detail,
  });
