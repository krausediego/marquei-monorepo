import { TableHead, TableRow } from "@/components/ui/table";

export function InvitationsTableHeader() {
  return (
    <TableRow>
      <TableHead className="w-125 pl-8">EMAIL</TableHead>
      <TableHead>FUNÇÃO</TableHead>
      <TableHead>ENVIADO EM</TableHead>
      <TableHead>EXPIRA EM</TableHead>
      <TableHead className="w-20 pr-8 text-end">AÇÃO</TableHead>
    </TableRow>
  );
}
