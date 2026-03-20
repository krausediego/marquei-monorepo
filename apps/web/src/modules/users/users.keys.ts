import type { PaginationQuery } from "@repo/shared";

export const userKeys = {
  // ["users"] — raiz de tudo, usar quando quiser invalidar qualquer coisa de usuários
  all: () => ["users"] as const,

  invitations: () => ["invitations"] as const,

  // ["users", "list"] — raiz das listas, usar quando quiser invalidar todas as listas independente dos filtros
  lists: () => [...userKeys.all(), "list"] as const,

  // ["users", "list", { search, page, limit }] — lista específica com filtros, cada combinação de filtros tem seu próprio cache
  list: (filters?: PaginationQuery) => [...userKeys.lists(), filters] as const,

  // ["users", "detail"] — raiz dos detalhes, usar quando quiser invalidar todos os detalhes
  details: () => [...userKeys.all(), "detail"] as const,

  // ["users", "detail", "id"] — detalhe de um usuário específico
  detail: (id: string) => [...userKeys.details(), id] as const,

  overview: () => [...userKeys.all(), "overview"] as const,

  invitationsLists: () => [...userKeys.invitations(), "list"] as const,

  invitationsList: (filters?: PaginationQuery) =>
    [...userKeys.invitationsLists(), filters] as const,
};
