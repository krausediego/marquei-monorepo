import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usersColumns } from "./columns";
import { UsersTableBody } from "./table-body";
import type { ListUsersData } from "../types";

interface UsersTableProps {
  data: ListUsersData[];
}

export function UsersTable({ data }: UsersTableProps) {
  const table = useReactTable({
    data,
    columns: usersColumns,
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
    </div>
  );
}
