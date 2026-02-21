import Elysia from "elysia";
import {
  helloWorldGetSchema,
  makeHelloWorldController,
} from "@/modules/hello-world";
import { adaptRoute } from "../handlers";
import { authClient } from "../middlewares/auth-client";

export default new Elysia({ prefix: "/hello-world" })
  .guard({
    beforeHandle: [authClient],
  })
  .get("/:message", adaptRoute(makeHelloWorldController()), {
    params: helloWorldGetSchema.params,
    response: helloWorldGetSchema.response,
  });
