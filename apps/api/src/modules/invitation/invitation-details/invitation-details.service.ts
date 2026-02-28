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
