import { getRole, type RoleProp } from "@repo/shared";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Ban, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ListUsersData } from "../../types";

interface UsersTableBodyProps {
  data: ListUsersData;
}

export function UsersTableBody({ data }: UsersTableBodyProps) {
  return (
    <TableRow>
      <TableCell className="pl-8 py-4 w-125">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={data.image ?? "#"} />
            <AvatarFallback>{data.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm text-foreground font-medium">{data.name}</p>
            <p className="text-xs text-muted-foreground">{data.email}</p>
            <p className="text-xs text-muted-foreground">{data.phoneNumber}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge>{getRole(data.role as RoleProp)}</Badge>
      </TableCell>
      <TableCell>
        <p>{format(data.memberAt, "dd MMM. yyyy", { locale: ptBR })}</p>
      </TableCell>
      <TableCell className="w-20 pr-8 text-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 size-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
            // disabled={meta.isLoading || row.original.id === userId}
            // onClick={() => meta.onDelete(row.original.id, row.original.name)}
            >
              <Ban />
              Revogar acesso
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
