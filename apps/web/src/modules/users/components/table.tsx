import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Pagination } from "@/components/pagination";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useRevokeUser } from "../hooks";
import { useUsersQueryStates } from "../hooks/use-users-query-states";
import type { ListUsersResponse } from "../types";
import { UsersAlertDialogRevokeUser } from "./alert-dialog-revoke-user";
import { usersColumns } from "./columns";
import { UsersTableBody } from "./table-body";
import { UsersTableSkeleton } from "./table-skeleton";

interface UsersTableProps {
  isLoading: boolean;
  data?: ListUsersResponse;
}

export function UsersTable({ data, isLoading }: UsersTableProps) {
  const [{ page, limit }, setQueryState] = useUsersQueryStates();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { isOpen, toggle, close, open } = useDisclosure();
  const { mutateAsync, isPending } = useRevokeUser({ onClose: close });

  const openDialog = (id: string) => {
    setSelectedId(id);
    open();
  };

  const table = useReactTable({
    data: data?.data ?? [],
    columns: usersColumns,
    pageCount: data?.meta?.totalPages,
    state: { pagination: { pageIndex: page - 1, pageSize: limit } },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: limit })
          : updater;

      setQueryState({ page: next.pageIndex + 1, limit: next.pageSize });
    },
    meta: {
      onDelete: openDialog,
      isLoading: isLoading || isPending,
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {isLoading ? (
            <UsersTableSkeleton />
          ) : (
            <UsersTableBody rows={table.getRowModel().rows} />
          )}
        </Table>
      </div>

      <AlertDialog open={isOpen} onOpenChange={toggle}>
        <UsersAlertDialogRevokeUser
          isLoading={isPending}
          revokeActionFn={async () => {
            if (selectedId) await mutateAsync(selectedId);
          }}
        />
      </AlertDialog>

      <Pagination table={table} isLoading={isLoading} {...data?.meta} />
    </>
  );
}
