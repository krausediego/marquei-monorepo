import Elysia from "elysia";
import {
  helloWorldGetSchema,
  makeHelloWorldController,
} from "@/modules/hello-world";
import { adaptRoute } from "../handlers";
import { authClient } from "../middlewares/auth-client";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/hello-world" })
  .guard({
    beforeHandle: [authClient],
  })
  .use(betterAuthPlugin)
  .get("/:message", adaptRoute(makeHelloWorldController()), {
    organization: true,
    params: helloWorldGetSchema.params,
    response: helloWorldGetSchema.response,
  });
