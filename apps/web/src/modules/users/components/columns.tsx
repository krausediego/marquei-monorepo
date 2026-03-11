import { getRole } from "@repo/shared";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { UsersTableColumns } from "../types";

export const usersColumns: ColumnDef<UsersTableColumns>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "role",
    header: "Permissão",
    cell: ({ row }) => {
      return <Badge>{getRole(row.getValue("role"))}</Badge>;
    },
  },
];
