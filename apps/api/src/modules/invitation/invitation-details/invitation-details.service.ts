import { isBefore } from "date-fns/isBefore";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import { BaseService } from "@/modules/shared";
import type { IInvitationDetails, InvitationDetails } from ".";

export class InvitationDetailsService
  extends BaseService
  implements IInvitationDetails
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run(
    params: InvitationDetails.Params
  ): Promise<InvitationDetails.Response> {
    this.log("info", "Fetching invitation details", {
      invitationId: params.invitationId,
    });

    this.log("info", "Looking up user", { userId: params.userId });

    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, params.userId);
      },
      columns: {
        email: true,
      },
    });

    if (!user) {
      this.log("warn", "User not found", { userId: params.userId });
      throw new BadRequestError("Usuário não encontrado");
    }

    this.log("info", "User found, looking up invitation", {
      userId: params.userId,
      invitationId: params.invitationId,
    });

    const invitation = await db.query.invitations.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, params.invitationId);
      },
      with: {
        organizations: {
          columns: {
            name: true,
            logo: true,
          },
        },
        users: {
          columns: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!invitation) {
      this.log("warn", "Invitation not found", {
        invitationId: params.invitationId,
      });
      throw new BadRequestError("O convite está inválido ou não existe.");
    }

    if (invitation.email !== user.email) {
      this.log("warn", "Invitation does not belong to the requesting user", {
        invitationId: params.invitationId,
        invitationUserId: invitation.users.id,
        requestingUserId: params.userId,
      });
      throw new BadRequestError("Este convite não pertence ao seu usuário.");
    }

    if (invitation.status !== "pending") {
      this.log("warn", "Invitation is not pending", {
        invitationId: params.invitationId,
        status: invitation.status,
      });
      throw new BadRequestError("O convite está inválido ou não existe.");
    }

    if (isBefore(invitation.expiresAt, new Date())) {
      this.log("warn", "Invitation is expired", {
        invitationId: params.invitationId,
        expiresAt: invitation.expiresAt,
      });
      throw new BadRequestError("O convite está inválido ou não existe.");
    }

    this.log("info", "Invitation details fetched successfully", {
      invitationId: params.invitationId,
      status: invitation.status,
      expiresAt: invitation.expiresAt,
      email: invitation.email,
    });

    return {
      ...invitation,
    };
  }
}
