import { type Static, type TSchema, t } from "elysia";

// ─── Query ────────────────────────────────────────────────────────────────────

export const cursorQuery = t.Object({
  cursor: t.Optional(t.String({ minLength: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 20 })),
  search: t.Optional(t.String({ minLength: 1 })),
});

export type CursorQuery = Static<typeof cursorQuery>;

// ─── Meta ─────────────────────────────────────────────────────────────────────

export const cursorMeta = t.Object({
  nextCursor: t.Nullable(t.String()),
  hasMore: t.Boolean(),
  limit: t.Number(),
});

export type CursorMeta = Static<typeof cursorMeta>;

// ─── Response ─────────────────────────────────────────────────────────────────

export const cursorPaginatedResponse = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    data: t.Array(dataSchema),
    meta: cursorMeta,
  });

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Usa o truque do limit+1 para saber se há mais registros
 * sem precisar de COUNT(*).
 *
 * @example
 * const rows = await db.query.notifications.findMany({
 *   limit: getCursorLimit(params.limit),
 * });
 * const { data, meta } = buildCursorMeta(rows, params.limit);
 */
export const getCursorLimit = (limit = 20) => limit + 1;

export const buildCursorMeta = <T extends { id: string }>(
  rows: T[],
  limit = 20
): { data: T[]; meta: CursorMeta } => {
  const hasMore = rows.length > limit;
  const data = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return {
    data,
    meta: {
      nextCursor,
      hasMore,
      limit,
    },
  };
};
