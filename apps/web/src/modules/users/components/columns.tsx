import { getRole } from "@repo/shared";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { UsersTableColumns } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export const usersColumns: ColumnDef<UsersTableColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      console.log("row", row);

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.image ?? "#"} />
            <AvatarFallback>{String(row.getValue("name"))[0]}</AvatarFallback>
          </Avatar>
          <p>{row.original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
  },
  {
    accessorKey: "role",
    header: "Permissão",
    cell: ({ row }) => {
      return <Badge>{getRole(row.getValue("role"))}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 size-8">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
