import { createContext, type ReactNode, useContext } from "react";

import { useListUsers } from "../hooks";
import { useUsersQueryStates } from "../hooks/use-users-query-states";
import type { UsersContextValue } from "../types";

const UsersContext = createContext<UsersContextValue | null>(null);

function UsersProvider({ children }: { children: ReactNode }) {
  const queryStates = useUsersQueryStates();
  const [query] = queryStates;
  const { data } = useListUsers({
    ...query,
    search: query?.search ?? undefined,
  });

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
