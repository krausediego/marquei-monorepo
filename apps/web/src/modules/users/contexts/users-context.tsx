import { createContext, type ReactNode, useContext, useMemo } from "react";

import { useListUsers } from "../hooks";
import { useUsersQueryStates } from "../hooks/use-users-query-states";
import type { UsersContextValue } from "../types";

const UsersContext = createContext<UsersContextValue | null>(null);

function UsersProvider({ children }: { children: ReactNode }) {
  const queryStates = useUsersQueryStates();
  const [query] = queryStates;

  const params = useMemo(
    () => ({
      ...query,
      search: query?.search?.length ? query?.search : undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(query)]
  );

  const { data } = useListUsers(params);

  return (
    <UsersContext.Provider value={{ data, queryStates }}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsersContext() {
  const ctx = useContext(UsersContext);
  if (!ctx)
    throw new Error("useUsersContext deve ser usado dentro do UsersProvider");
  return ctx;
}

export { UsersProvider, useUsersContext };
