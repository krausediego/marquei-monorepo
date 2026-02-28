import Elysia from "elysia";
import {
  acceptInvitationSchema,
  deleteInvitationSchema,
  invitationDetailsSchema,
  inviteUserSchema,
  listInvitationsSchema,
  makeAcceptInvitationController,
  makeDeleteInvitationController,
  makeInvitationDetailsController,
  makeInviteUserController,
  makeListInvitationsController,
  makeRejectInvitationController,
  rejectInvitationSchema,
} from "@/modules/invitation";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/invitation" })
  .use(betterAuthPlugin)
  .post("/", adaptRoute(makeInviteUserController()), {
    organization: true,
    body: inviteUserSchema.body,
    response: inviteUserSchema.response,
    detail: inviteUserSchema.detail,
  })
  .get("/", adaptRoute(makeListInvitationsController()), {
    organization: true,
    query: listInvitationsSchema.query,
    response: listInvitationsSchema.response,
    detail: listInvitationsSchema.detail,
  })
  .get("/:invitationId", adaptRoute(makeInvitationDetailsController()), {
    auth: true,
    params: invitationDetailsSchema.params,
    response: invitationDetailsSchema.response,
    detail: invitationDetailsSchema.detail,
  })
  .delete("/:invitationId", adaptRoute(makeDeleteInvitationController()), {
    organization: true,
    params: deleteInvitationSchema.params,
    response: deleteInvitationSchema.response,
    detail: deleteInvitationSchema.detail,
  })
  .post("/accept", adaptRoute(makeAcceptInvitationController()), {
    auth: true,
    body: acceptInvitationSchema.body,
    response: acceptInvitationSchema.response,
    detail: acceptInvitationSchema.detail,
  })
  .post("/reject", adaptRoute(makeRejectInvitationController()), {
    auth: true,
    body: rejectInvitationSchema.body,
    response: rejectInvitationSchema.response,
    detail: rejectInvitationSchema.detail,
  });
