import { flexRender, type Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { UsersTableColumns } from "../types";
import { usersColumns } from "./columns";

type UsersTableBodyProps = {
  rows: Row<UsersTableColumns>[];
};

export function UsersTableBody({ rows }: UsersTableBodyProps) {
  return (
    <TableBody>
      {rows?.length ? (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={usersColumns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
