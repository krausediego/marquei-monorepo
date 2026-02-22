import Elysia from "elysia";
import { betterAuthPlugin } from "../plugins";
import { adaptRoute } from "../handlers";
import {
  createOrganizationSchema,
  makeCreateOrganizationController,
} from "@/modules/organization/create-organization";

export default new Elysia({ prefix: "/organization" })
  .use(betterAuthPlugin)
  .post("/", adaptRoute(makeCreateOrganizationController()), {
    organization: true,
    body: createOrganizationSchema.body,
    response: createOrganizationSchema.response,
    detail: createOrganizationSchema.detail,
  });
