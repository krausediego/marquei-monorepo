import Elysia from "elysia";
import { betterAuthPlugin } from "../plugins";
import { adaptRoute } from "../handlers";

export default new Elysia({ prefix: "/organization" })
  .use(betterAuthPlugin)
  .post("/", adaptRoute());
