import { randomUUIDv7 } from "bun";
import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizations, users } from ".";

export const notificationTypeEnum = pgEnum("notification_type", [
  "invite", // requer ação (aceitar/rejeitar)
  "reminder", // apenas informativo
  "announcement", // broadcast para toda a org
  "alert", // avisos gerais
]);

export const notificationStatusEnum = pgEnum("notification_status", [
  "pending", // aguardando ação (só para tipos acionáveis)
  "accepted", // convite aceito
  "rejected", // convite rejeitado
  "dismissed", // descartado sem ação
]);

export const notifications = pgTable(
  "notifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUIDv7()),

    // NULL = broadcast para toda a organização
    // preenchido = notificação para usuário específico
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),

    // NULL = notificação global/sistema (fora de uma org)
    organizationId: text("organization_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),

    type: notificationTypeEnum("type").notNull(),

    title: text("title").notNull(),
    body: text("body").notNull(),

    // referência genérica ao recurso relacionado (inviteId, appointmentId, etc.)
    referenceId: text("reference_id"),
    referenceTable: text("reference_table"), // "invitations", "appointments", etc.

    // só faz sentido para tipos acionáveis como "invite"
    status: notificationStatusEnum("status"),

    // controle de leitura
    readAt: timestamp("read_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at"), // útil para lembretes com validade
  },
  (table) => ({
    // busca principal: notificações de um usuário específico não lidas
    userIdReadAtIdx: index("notifications_user_id_read_at_idx").on(
      table.userId,
      table.readAt
    ),
    // busca de broadcast: notificações de uma organização
    orgIdIdx: index("notifications_organization_id_idx").on(
      table.organizationId
    ),
    // busca por tipo dentro de uma org (ex: todos os invites pendentes)
    orgTypeIdx: index("notifications_organization_id_type_idx").on(
      table.organizationId,
      table.type
    ),
    // lookup reverso pelo recurso relacionado
    referenceIdx: index("notifications_reference_idx").on(
      table.referenceId,
      table.referenceTable
    ),
  })
);
