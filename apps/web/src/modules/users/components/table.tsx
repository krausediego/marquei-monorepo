import { flexRender } from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsersTableBody } from "./table-body";
import { UsersTableSkeleton } from "./table-skeleton";
import { useUsersContext } from "../contexts";

export function UsersTable() {
  const { table, isFetching } = useUsersContext();

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

          {isFetching ? (
            <UsersTableSkeleton />
          ) : (
            <UsersTableBody rows={table.getRowModel().rows} />
          )}
        </Table>
      </div>
  );
}
