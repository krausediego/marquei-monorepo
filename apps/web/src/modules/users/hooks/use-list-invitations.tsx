import { useQuery } from "@tanstack/react-query";
import { listInvitations } from "../api";
import { userKeys } from "../users.keys";
import { useInvitationsQueryStates } from "./use-invitations-query-states";

export function useListInvitations() {
  const [queryStates] = useInvitationsQueryStates();

  const params = {
    page: queryStates.invitationsPage,
    limit: queryStates.invitationsLimit,
  };

  return useQuery({
    queryKey: userKeys.invitationsList(params),
    queryFn: async () => {
      const { data, error } = await listInvitations(params);

      if (error) throw error;

      return data;
    },
  });
}
