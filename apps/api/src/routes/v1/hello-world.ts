import Elysia from "elysia";
import {
  helloWorldGetSchema,
  makeHelloWorldController,
} from "@/modules/hello-world";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/hello-world" })
  .use(betterAuthPlugin)
  .get("/", () => console.log("kk"))
  .get("/:message", adaptRoute(makeHelloWorldController()), {
    organization: true,
    params: helloWorldGetSchema.params,
    response: helloWorldGetSchema.response,
  });
