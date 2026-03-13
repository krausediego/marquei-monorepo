import Elysia from "elysia";
import {
  makeRevokeMemberController,
  revokeMemberSchema,
} from "@/modules/member/revoke-member";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/member" })
  .use(betterAuthPlugin)
  .post("/revoke/:id", adaptRoute(makeRevokeMemberController()), {
    auth: true,
    params: revokeMemberSchema.params,
    response: revokeMemberSchema.response,
    detail: revokeMemberSchema.detail,
  });
