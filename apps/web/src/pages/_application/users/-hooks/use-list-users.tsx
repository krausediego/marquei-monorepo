import { client } from "@/lib/treaty";
import { useQuery } from "@tanstack/react-query";

interface ListUsersQueryProps {
  search?: string;
  limit?: number;
  orderBy?: "createdAt" | "name";
  orderDirection?: "asc" | "desc";
  page?: number;
}

export function useListUsers(query: ListUsersQueryProps) {
  return useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      return (await client.members.get()).data;
    },
  });
}
