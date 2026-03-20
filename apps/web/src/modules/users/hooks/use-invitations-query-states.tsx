import { parseAsInteger, useQueryStates } from "nuqs";

export function useInvitationsQueryStates() {
  return useQueryStates({
    invitationsPage: parseAsInteger.withDefault(1),
    invitationsLimit: parseAsInteger.withDefault(10),
  });
}
