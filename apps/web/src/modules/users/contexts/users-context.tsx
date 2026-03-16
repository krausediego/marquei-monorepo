import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useListUsers, useRevokeUser } from "../hooks";
import { useUsersQueryStates } from "../hooks/use-users-query-states";
import type { UsersContextValue } from "../types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { usersColumns } from "../components";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useRouteContext } from "@tanstack/react-router";
import { useInviteUser } from "../hooks/use-invite-user";

const UsersContext = createContext<UsersContextValue | null>(null);

function UsersProvider({ children }: { children: ReactNode }) {
  const disclosure = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const queryStates = useUsersQueryStates();
  const { data, isLoading, isRefetching } = useListUsers();
  const { mutateAsync: revokeUserFn, isPending: isRevokeUserPending } =
    useRevokeUser({
      onClose: disclosure.close,
    });
  const { mutateAsync: inviteUserFn, isPending: isInviteUserPending } =
    useInviteUser();
  const { user } = useRouteContext({ from: "/_app" });

  const [{ page, limit, search }, setQueryState] = queryStates;

  const openDialog = useCallback(
    (id: string, name: string) => {
      setSelectedId(id);
      setSelectedName(name);
      disclosure.open();
    },
    [disclosure.open]
  );

  const handleRevokeUser = useCallback(async () => {
    if (selectedId) await revokeUserFn(selectedId);
  }, [selectedId, revokeUserFn]);

  const handleInviteUser = useCallback(async (email: string) => {
    await inviteUserFn(email);
  }, []);

  const columns = useMemo(() => usersColumns(user.id), [user.id]);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.meta?.totalPages,
    state: { pagination: { pageIndex: page - 1, pageSize: limit }, globalFilter: search },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: limit })
          : updater;

      setQueryState({ page: next.pageIndex + 1, limit: next.pageSize });
    },
    onGlobalFilterChange: (value) => {
      setQueryState({search: value, page: 1})
    },
    getRowId: (row) => row.id,
    meta: {
      onDelete: openDialog,
      isLoading,
    },
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
  if (data?.data) {
    // Força a tabela a injetar os dados novos e resetar estados inconsistentes
    table.setOptions((prev) => ({
      ...prev,
      data: data.data,
    }));
  }
}, [data?.data, table]);

  return (
    <UsersContext.Provider value={{
      data,
      queryStates,
      table,
      openDialog,
      selectedId,
      disclosure,
      handleRevokeUser,
    handleInviteUser,
      isFetching: isLoading || isRefetching,
      isPending: isRevokeUserPending || isInviteUserPending,
      selectedName
    }}>{children}</UsersContext.Provider>
  );
}

function useUsersContext() {
  const ctx = useContext(UsersContext);
  if (!ctx)
    throw new Error("useUsersContext deve ser usado dentro do UsersProvider");
  return ctx;
}

export { UsersProvider, useUsersContext };
