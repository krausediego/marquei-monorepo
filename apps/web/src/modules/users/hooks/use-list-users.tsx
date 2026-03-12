import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api";
import { userKeys } from "../users.keys";
import { useUsersQueryStates } from "./use-users-query-states";

export function useListUsers() {
  const [queryStates] = useUsersQueryStates();

  const search = queryStates?.search?.length ? queryStates.search : undefined;
  const params = { ...queryStates, search };

  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const { data, error } = await listUsers(params);

      if (error) throw error;

      return data;
    },
  });
}
