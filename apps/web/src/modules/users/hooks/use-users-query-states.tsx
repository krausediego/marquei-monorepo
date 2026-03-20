import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useUsersQueryStates() {
  return useQueryStates({
    search: parseAsString,
    usersPage: parseAsInteger.withDefault(1),
    usersLimit: parseAsInteger.withDefault(10),
  });
}
