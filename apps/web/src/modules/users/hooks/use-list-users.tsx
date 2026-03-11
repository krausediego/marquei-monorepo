import type { PaginationQuery } from "@repo/shared";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api";
import { userKeys } from "../users.keys";

export function useListUsers(params?: PaginationQuery) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const { data, error } = await listUsers(params);

      if (error) throw error;

      return data;
    },
  });
}
