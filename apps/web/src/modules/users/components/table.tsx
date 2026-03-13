import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "@/components/pagination";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUsersQueryStates } from "../hooks/use-users-query-states";
import type { ListUsersResponse } from "../types";
import { usersColumns } from "./columns";
import { UsersTableBody } from "./table-body";
import { UsersTableSkeleton } from "./table-skeleton";
import { useRevokeUser } from "../hooks";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { UsersAlertDialogRevokeUser } from "./alert-dialog-revoke-user";

interface UsersTableProps {
  isLoading: boolean;
  data?: ListUsersResponse;
}

export function UsersTable({ data, isLoading }: UsersTableProps) {
  const [{ page, limit }, setQueryState] = useUsersQueryStates();
  const { mutateAsync, isPending } = useRevokeUser();
  const { open, setOpen, openDialog, confirm, handleOpenChange } =
    useConfirmDialog({
      isPending,
      onConfirm: (id: string) =>
        mutateAsync(id, {
          onSuccess: () => setOpen(false),
          onError: () => setOpen(false),
        }),
    });

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

      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <UsersAlertDialogRevokeUser
          isLoading={isPending}
          revokeActionFn={confirm}
        />
      </AlertDialog>

      <Pagination table={table} isLoading={isLoading} {...data?.meta} />
    </>
  );
}
