import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Ellipsis } from "lucide-react";
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
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/_application/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryFn: async () =>
      (
        await auth.organization.listMembers({
          query: {
            filterField: "name",
            filterOperator: "contains",
            filterValue: "Die",
          },
        })
      ).data?.members,
    queryKey: ["users"],
  });

  return (
    <ContentLayout title="Usuários">
      <div className="rounded-md border">
        <div className="flex items-center gap-4 p-4">
          <Input placeholder="Buscar..." className="w-auto" />
          <Button>Buscar</Button>
        </div>

        <Table>
          <TableHeader className="border-t">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user.name}</TableCell>
                <TableCell>{user.user.email}</TableCell>
                <TableCell>
                  <Ellipsis />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  );
}
