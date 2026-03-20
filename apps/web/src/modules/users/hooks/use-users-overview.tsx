import { useQuery } from "@tanstack/react-query";
import { usersOverview } from "../api";
import { userKeys } from "../users.keys";

export function useUsersOverview() {
  return useQuery({
    queryKey: userKeys.overview(),
    queryFn: async () => {
      const { data, error } = await usersOverview();

      if (error) throw error;

      return data;
    },
  });
}
