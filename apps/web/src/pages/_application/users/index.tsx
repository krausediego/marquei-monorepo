import { createFileRoute } from "@tanstack/react-router";
import { Ellipsis, Mail } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListUsers } from "./-hooks/use-list-users";

export const Route = createFileRoute("/_application/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useListUsers({});

  return (
    <ContentLayout title="Usuários">
      <div className="rounded-md border">
        <div className="flex items-center gap-4 p-4">
          <Input placeholder="Buscar..." className="w-auto" />
          <Button>Buscar</Button>

          <Button className="ml-auto">
            <Mail className="size-4" /> Convidar novo usuário
          </Button>
        </div>

        <Table>
          <TableHeader className="border-t">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Função</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Ellipsis />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center gap-4 p-4">
          <Button size="sm" variant="outline" className="ml-auto">
            Anterior
          </Button>

          <Button size="sm" variant="outline">
            Próxima
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
}
