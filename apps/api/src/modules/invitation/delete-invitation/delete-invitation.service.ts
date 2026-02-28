import { eq } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { DeleteInvitation, IDeleteInvitation } from ".";

export class DeleteInvitationService
  extends BaseService
  implements IDeleteInvitation
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    invitationId,
    userId,
    organizationId,
  }: DeleteInvitation.Params): Promise<DeleteInvitation.Response> {
    this.log("info", "Deleting invitation", {
      invitationId,
      userId,
      organizationId,
    });

    this.log("info", "Checking if user is a member of the organization", {
      userId,
      organizationId,
    });

    const member = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.userId, userId),
          eq(fields.organizationId, organizationId)
        );
      },
    });

    if (!member) {
      this.log("warn", "User is not a member of the organization", {
        userId,
        organizationId,
      });
      throw new BadRequestError("Você não faz parte deste estabelecimento.");
    }

    this.log("info", "Member found, checking role permissions", {
      memberId: member.id,
      role: member.role,
    });

    if (!["owner", "admin"].includes(member.role)) {
      this.log("warn", "User does not have permission to delete invitations", {
        memberId: member.id,
        role: member.role,
      });
      throw new BadRequestError("Sem permissão");
    }

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

    if (invitation.organizationId !== organizationId) {
      this.log("warn", "Invitation does not belong to the organization", {
        invitationId,
        invitationOrganizationId: invitation.organizationId,
        organizationId,
      });
      throw new BadRequestError("Convite não pertence a este estabelecimento.");
    }

    const notification = await db.query.notifications.findFirst({
      where(fields, { eq }) {
        return eq(fields.referenceId, invitationId);
      },
    });

    if (notification) {
      this.log("info", "Deleting related notification", {
        notificationId: notification.id,
        invitationId,
      });

      // TODO: Implements SSE calling refetch notifications.
      await db
        .delete(schema.notifications)
        .where(eq(schema.notifications.id, notification.id));

      this.log("info", "Related notification deleted", {
        notificationId: notification.id,
      });
    } else {
      this.log("info", "No related notification found for invitation", {
        invitationId,
      });
    }

    this.log("info", "Deleting invitation from database", { invitationId });

    await db
      .delete(schema.invitations)
      .where(eq(schema.invitations.id, invitationId));

    this.log("info", "Invitation deleted successfully", {
      invitationId,
      organizationId,
      deletedBy: userId,
    });

    return {
      message: "Convite excluído com sucesso!",
      deleted: true,
    };
  }
}
