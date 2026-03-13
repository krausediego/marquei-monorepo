import { eq } from "drizzle-orm";
import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import * as schema from "@/infra/database/schema";
import { BaseService } from "@/modules/shared";
import type { IRevokeMember, RevokeMember } from ".";

export class RevokeMemberService extends BaseService implements IRevokeMember {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run({
    id,
    userId,
    organizationId,
  }: RevokeMember.Params): Promise<RevokeMember.Response> {
    this.log("info", "Starting process revoke-member", {
      id,
      userId,
      organizationId,
    });

    this.log("info", "Fetching executor member", { userId, organizationId });
    const userToExecute = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.userId, userId),
          eq(fields.organizationId, organizationId)
        );
      },
    });

    if (!userToExecute) {
      this.log("warn", "Executor not found in organization", {
        userId,
        organizationId,
      });
      throw new BadRequestError("Usuário não faz parte da organização");
    }

    this.log("info", "Executor found", { userId, role: userToExecute.role });

    if (!["owner"].includes(userToExecute.role)) {
      this.log("warn", "Executor lacks permission", {
        userId,
        role: userToExecute.role,
      });
      throw new BadRequestError("Usuário sem permissão para a ação");
    }

    this.log("info", "Fetching target member to revoke", {
      id,
      organizationId,
    });
    const userToRevoke = await db.query.members.findFirst({
      where(fields, { and, eq }) {
        return and(
          eq(fields.userId, id),
          eq(fields.organizationId, organizationId)
        );
      },
    });

    if (!userToRevoke) {
      this.log("warn", "Target user not found in organization", {
        id,
        organizationId,
      });
      throw new BadRequestError(
        "O usuário a ser revogado não faz parte da organização."
      );
    }

    this.log("info", "Revoking member", {
      memberId: userToRevoke.id,
      userId: id,
    });

    await db
      .delete(schema.members)
      .where(eq(schema.members.id, userToRevoke.id));

    this.log("info", "Member revoked successfully", {
      memberId: userToRevoke.id,
      userId: id,
    });

    return {
      message: "Usuário revogado com sucesso!",
      revoked: true,
    };
  }
}
