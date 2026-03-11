import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useUsersQueryStates() {
  return useQueryStates({
    search: parseAsString,
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });
}
