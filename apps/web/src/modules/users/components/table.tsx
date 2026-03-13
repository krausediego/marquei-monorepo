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

interface UsersTableProps {
  isLoading: boolean;
  data?: ListUsersResponse;
}

export function UsersTable({ data, isLoading }: UsersTableProps) {
  const [{ page, limit }, setQueryState] = useUsersQueryStates();

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

          {true ? (
            <UsersTableSkeleton />
          ) : (
            <UsersTableBody rows={table.getRowModel().rows} />
          )}
        </Table>
      </div>
      <Pagination table={table} {...data?.meta} />
    </>
  );
}
