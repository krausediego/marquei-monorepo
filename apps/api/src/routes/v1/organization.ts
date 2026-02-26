import Elysia from "elysia";
import {
  createOrganizationSchema,
  findAllOrganizationsSchema,
  makeCreateOrganizationController,
  makeFindAllOrganizationsController,
  makeUpdateOrganizationController,
  updateOrganizationSchema,
} from "@/modules/organization";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/organization" })
  .use(betterAuthPlugin)
  .post("/", adaptRoute(makeCreateOrganizationController()), {
    auth: true,
    body: createOrganizationSchema.body,
    response: createOrganizationSchema.response,
    detail: createOrganizationSchema.detail,
  })
  .get("/", adaptRoute(makeFindAllOrganizationsController()), {
    auth: true,
    response: findAllOrganizationsSchema.response,
    detail: findAllOrganizationsSchema.detail,
  })
  .put("/:id", adaptRoute(makeUpdateOrganizationController()), {
    auth: true,
    params: updateOrganizationSchema.params,
    body: updateOrganizationSchema.body,
    response: updateOrganizationSchema.response,
    detail: updateOrganizationSchema.detail,
  })
