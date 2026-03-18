import { TableHead, TableRow } from "@/components/ui/table";

export function UsersTableHeader() {
  return (
    <TableRow>
      <TableHead className="w-125 pl-8">USUÁRIO</TableHead>
      <TableHead>FUNÇÃO</TableHead>
      <TableHead>DESDE</TableHead>
      <TableHead className="w-20 pr-8">AÇÕES</TableHead>
    </TableRow>
  );
}
