import { createFileRoute } from "@tanstack/react-router";
import { Mail, Pencil, Trash2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { roleMapping } from "@/helpers/role";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { useAuth } from "@/contexts/auth-context";
import { client } from "@/lib/treaty";

export const Route = createFileRoute("/_application/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useListUsers({});
  const { organizationId } = useAuth();

  async function createInvite() {
    await client.invite.post({
      email: "ana.babiela@gmail.com",
    });

    console.log(data);
  }

  return (
    <ContentLayout title="Usuários">
      <div className="rounded-md border">
        <div className="flex items-center gap-4 p-4">
          <div>
            <h3 className="text-lg font-semibold">Gerenciar Usuários</h3>
            <span className="text-muted-foreground text-sm">
              Controle de acesso e membros da equipe
            </span>
          </div>

          <Input placeholder="Buscar..." className="ml-auto w-auto" />
          <Button onClick={createInvite}>
            <Mail className="size-4" /> Convidar usuário
          </Button>
        </div>

        <Table>
          <TableHeader className="border-t">
            <TableRow>
              <TableHead>NOME</TableHead>
              <TableHead>E-MAIL</TableHead>
              <TableHead>FUNÇÃO</TableHead>
              <TableHead className="w-24 px-6 py-4" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id} className="group">
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="default">
                    {roleMapping[user.role as keyof typeof roleMapping]}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-right align-middle">
                  <div className="flex translate-x-2 items-center justify-end gap-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                    <button
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
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
