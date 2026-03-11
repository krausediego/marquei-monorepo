import { type Static, type TSchema, t } from "elysia";

export const paginationQuery = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 20 })),
  search: t.Optional(t.String({ minLength: 1 })),
});

export type PaginationQuery = Static<typeof paginationQuery>;

export const paginationMeta = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  hasNextPage: t.Boolean(),
  hasPrevPage: t.Boolean(),
});

export type PaginationMeta = Static<typeof paginationMeta>;

export const paginatedResponse = <T extends TSchema>(dataSchema: T) =>
  t.Object({
    data: t.Array(dataSchema),
    meta: paginationMeta,
  });

export const getPaginationOffset = (page = 1, limit = 20) => ({
  offset: (page - 1) * limit,
  limit,
  page,
});

export const buildPaginationMeta = (
  total: number,
  page = 1,
  limit = 20
): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
