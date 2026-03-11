import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { UsersTable } from "@/modules/users/components/table";
import { UsersProvider } from "@/modules/users/contexts";

export const Route = createFileRoute("/_app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UsersProvider>
      <ContentLayout title="Usuários">
        <Card>
          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
      </ContentLayout>
    </UsersProvider>
  );
}
