import { addDays } from "date-fns/addDays";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IInviteUser, InviteUser } from ".";

export class InviteUserService extends BaseService implements IInviteUser {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run(params: InviteUser.Params): Promise<InviteUser.Response> {
    this.log("info", "Inviting user to organization", {
      organizationId: params.organizationId,
      inviterId: params.userId,
      email: params.email,
    });

    this.log("info", "Checking if requester is a member of the organization", {
      organizationId: params.organizationId,
      userId: params.userId,
    });

    const member = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.organizationId, params.organizationId),
          eq(fields.userId, params.userId)
        );
      },
    });

    if (!member) {
      this.log("warn", "Requester is not a member of the organization", {
        organizationId: params.organizationId,
        userId: params.userId,
      });
      throw new BadRequestError("Você não faz parte deste estabelecimento.");
    }

    this.log("info", "Member found, checking role permissions", {
      memberId: member.id,
      role: member.role,
    });

    if (!["owner", "admin"].includes(member.role)) {
      this.log("warn", "Requester does not have permission to invite users", {
        memberId: member.id,
        role: member.role,
      });
      throw new BadRequestError("Sem permissão");
    }

    this.log("info", "Looking up user by email", { email: params.email });

    const userToInvite = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, params.email);
      },
    });

    if (!userToInvite || userToInvite.id === params.userId) {
      this.log("warn", "No user found with the provided email", {
        email: params.email,
      });
      throw new BadRequestError(
        "Não existe um usuário disponível para receber este convite"
      );
    }

    const userHasMember = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.organizationId, params.organizationId),
          eq(fields.userId, userToInvite.id)
        );
      },
    });

    if (userHasMember) {
      this.log("warn", "User found in organization the provided email", {
        id: userToInvite.id,
        email: params.email,
        name: userToInvite.name,
      });
      throw new BadRequestError(
        "Este usuário já faz parte do seu estabelecimento"
      );
    }

    this.log("info", "User found, checking for existing pending invite", {
      email: params.email,
      organizationId: params.organizationId,
    });

    const existingInvite = await db.query.invitations.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.organizationId, params.organizationId),
          eq(fields.email, params.email),
          eq(fields.status, "pending")
        );
      },
    });

    if (existingInvite) {
      this.log("warn", "Pending invite already exists for this email", {
        organizationId: params.organizationId,
        email: params.email,
        existingInviteId: existingInvite.id,
      });
      throw new BadRequestError(
        "Já existe um convite pendente para este e-mail."
      );
    }

    this.log(
      "info",
      "Starting transaction: insert invitation and notification"
    );

    await db.transaction(async (tx) => {
      const [invite] = await tx
        .insert(schema.invitations)
        .values({
          email: params.email,
          expiresAt: addDays(new Date(), 2),
          inviterId: params.userId,
          organizationId: params.organizationId,
          role: "member",
          status: "pending",
        })
        .returning({ id: schema.invitations.id });

      this.log("info", "Invitation inserted", {
        inviteId: invite.id,
        email: params.email,
        organizationId: params.organizationId,
      });

      await tx.insert(schema.notifications).values({
        organizationId: params.organizationId,
        userId: userToInvite.id,
        type: "invite",
        title: "Você recebeu um convite",
        body: "Você foi convidado para fazer parte de um estabelecimento.",
        referenceId: invite.id,
        referenceTable: "invitations",
        status: "pending",
        expiresAt: addDays(new Date(), 2),
      });

      this.log("info", "Notification inserted", {
        inviteId: invite.id,
        targetUserId: userToInvite.id,
      });
    });

    this.log("info", "Invitation process completed successfully", {
      organizationId: params.organizationId,
      email: params.email,
    });

    return {
      message: "Convite enviado com sucesso!",
      invited: true,
    };
  }
}
