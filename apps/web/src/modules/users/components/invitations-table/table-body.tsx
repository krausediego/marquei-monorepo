import { getRole, type RoleProp } from "@repo/shared";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ListInvitationsData } from "../../types";

interface InvitationsTableBodyProps {
  data: ListInvitationsData;
}

export function InvitationsTableBody({ data }: InvitationsTableBodyProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2 pl-6 text-muted-foreground">
          <Mail className="size-4" />
          {data.email}
        </div>
      </TableCell>
      <TableCell>
        <Badge>{getRole(data.role as RoleProp)}</Badge>
      </TableCell>
      <TableCell>
        {format(data.createdAt, "dd MMM. yyyy", { locale: ptBR })}
      </TableCell>
      <TableCell>
        {format(data.expiresAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
      </TableCell>
      <TableCell className="pr-8">
        <Button variant="link" className="px-0 text-destructive cursor-pointer">
          Revogar
        </Button>
      </TableCell>
    </TableRow>
  );
}
