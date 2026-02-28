import Elysia from "elysia";
import {
  listNotificationsSchema,
  makeListNotificationsController,
} from "@/modules/notification";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/notification" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeListNotificationsController()), {
    auth: true,
    query: listNotificationsSchema.query,
    response: listNotificationsSchema.response,
    detail: listNotificationsSchema.detail,
  });
