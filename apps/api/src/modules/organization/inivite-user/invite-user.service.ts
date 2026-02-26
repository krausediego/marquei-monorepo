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
    this.log("info", "Iniciando busca de membro", {
      organizationId: params.organizationId,
      inviterId: params.userId,
      email: params.email,
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
      this.log("warn", "Usuário não é membro da organização", {
        organizationId: params.organizationId,
        userId: params.userId,
      });
      throw new BadRequestError("Você não faz parte deste estabelecimento.");
    }

    this.log("info", "Membro encontrado", {
      memberId: member.id,
      role: member.role,
    });

    if (!["owner", "admin"].includes(member.role)) {
      this.log("warn", "Permissão insuficiente", {
        memberId: member.id,
        role: member.role,
      });
      throw new BadRequestError("Sem permissão");
    }

    const userToInvite = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, params.email);
      },
    });

    if (!userToInvite) {
      this.log("warn", "Não foi encontrado um usuário com o email fornecido", {
        email: params.email,
      });
      throw new BadRequestError(
        "Não existe um usuário disponível para receber este convite"
      );
    }

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
      this.log("warn", "Já existe convite pendente para este email", {
        organizationId: params.organizationId,
        email: params.email,
        existingInviteId: existingInvite.id,
      });
      throw new BadRequestError(
        "Já existe um convite pendente para este e-mail."
      );
    }

    await db.transaction(async (tx) => {
      this.log("info", "Iniciando transação");

      let inviteId: string;

      try {
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

        inviteId = invite.id;

        this.log("info", "Convite inserido", {
          inviteId,
        });
      } catch (err) {
        this.log("error", "Erro ao inserir convite", {
          err,
        });
        throw err;
      }

      try {
        await tx.insert(schema.notifications).values({
          organizationId: params.organizationId,
          userId: params.targetUserId ?? null,
          type: "invite",
          title: "Você recebeu um convite",
          body: `Você foi convidado para fazer parte de um estabelecimento.`,
          referenceId: inviteId,
          referenceTable: "invitations",
          status: "pending",
          expiresAt: addDays(new Date(), 2),
        });

        this.logger.info("InviteUserService.run :: notificação inserida", {
          inviteId,
          targetUserId: params.targetUserId ?? "sem conta ainda",
        });
      } catch (err) {
        this.logger.error(
          "InviteUserService.run :: erro ao inserir notificação",
          { err }
        );
        throw err;
      }
    });

    this.logger.info(
      "InviteUserService.run :: transação concluída com sucesso",
      {
        organizationId: params.organizationId,
        email: params.email,
      }
    );
  }
}
