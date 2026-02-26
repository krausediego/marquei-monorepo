import { isBefore } from "date-fns/isBefore";
import { eq } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { AcceptInvitation, IAcceptInvitation } from ".";

export class AcceptInvitationService
  extends BaseService
  implements IAcceptInvitation
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    invitationId,
    userId,
  }: AcceptInvitation.Params): Promise<AcceptInvitation.Response> {
    this.log("info", "Accepting invitation", { invitationId, userId });

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

    this.log("info", "Invitation found, validating status and expiration", {
      invitationId,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
    });

    if (
      invitation.status !== "pending" ||
      isBefore(invitation.expiresAt, new Date())
    ) {
      this.log("warn", "Invitation is invalid or expired", {
        invitationId,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
      });

      await db
        .update(schema.invitations)
        .set({ status: "expired" })
        .where(eq(schema.invitations.id, invitationId));

      throw new BadRequestError("Convite inválido");
    }

    this.log("info", "Looking up user by invitation email", {
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

    this.log(
      "info",
      "Starting transaction: insert member and update invitation status",
      {
        invitationId,
        userId: user.id,
        organizationId: invitation.organizationId,
      }
    );

    await db.transaction(async (tx) => {
      await tx.insert(schema.members).values({
        organizationId: invitation.organizationId,
        userId: user.id,
        role: "member",
      });

      this.log("info", "Member inserted", {
        userId: user.id,
        organizationId: invitation.organizationId,
      });

      await tx
        .update(schema.invitations)
        .set({ status: "accepted" })
        .where(eq(schema.invitations.id, invitationId));

      this.log("info", "Invitation status updated to accepted", {
        invitationId,
      });
    });

    this.log("info", "Invitation accepted successfully", {
      invitationId,
      userId: user.id,
      organizationId: invitation.organizationId,
    });

    return {
      message: "Convite aceito com sucesso!",
      accepted: true,
    };
  }
}
