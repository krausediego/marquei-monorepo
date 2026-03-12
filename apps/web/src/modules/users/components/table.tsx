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

interface UsersTableProps {
  data?: ListUsersResponse;
}

export function UsersTable({ data }: UsersTableProps) {
  const [{ page, limit }, setQueryState] = useUsersQueryStates();

  const table = useReactTable({
    data: data?.data ?? [],
    columns: usersColumns,
    pageCount: data?.meta?.totalPages,
    state: { pagination: { pageIndex: page, pageSize: limit } },
    onPaginationChange: (a) => console.log(a),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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

        <UsersTableBody rows={table.getRowModel().rows} />
      </Table>

      <Pagination table={table} {...data?.meta} />
    </div>
  );
}
