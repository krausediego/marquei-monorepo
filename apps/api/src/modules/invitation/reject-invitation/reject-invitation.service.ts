import { eq } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IRejectInvitation, RejectInvitation } from ".";

export class RejectInvitationService
  extends BaseService
  implements IRejectInvitation
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    invitationId,
    userId,
  }: RejectInvitation.Params): Promise<RejectInvitation.Response> {
    this.log("info", "Rejecting invitation", { invitationId, userId });

    this.log("info", "Looking up invitation", { invitationId });

    const invitation = await db.query.invitations.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, invitationId);
      },
    });

    if (!invitation) {
      this.log("warn", "Invitation not found", { invitationId });
      throw new BadRequestError("Convite não encontrado.");
    }

    this.log("info", "Invitation found, looking up user by invitation email", {
      invitationId,
      email: invitation.email,
    });

    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, invitation.email);
      },
    });

    if (!user || user.id !== userId) {
      this.log("warn", "User not found or does not match invitation", {
        invitationEmail: invitation.email,
        userId,
        foundUserId: user?.id ?? null,
      });
      throw new BadRequestError("Usuário não existe ou não é o mesmo");
    }

    this.log("info", "Updating invitation status to rejected", {
      invitationId,
    });

    await db
      .update(schema.invitations)
      .set({ status: "rejected" })
      .where(eq(schema.invitations.id, invitationId));

    this.log("info", "Invitation rejected successfully", {
      invitationId,
      userId: user.id,
      organizationId: invitation.organizationId,
    });

    return {
      message: "Convite rejeitado com sucesso!",
      rejected: true,
    };
  }
}
