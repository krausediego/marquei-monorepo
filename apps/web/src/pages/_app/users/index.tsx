import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import { UsersHeader } from "@/modules/users/components/header";
import { UsersTable } from "@/modules/users/components/table";
import { UsersProvider } from "@/modules/users/contexts";
import { useListUsers } from "@/modules/users/hooks";

export const Route = createFileRoute("/_app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useListUsers();

  return (
    <UsersProvider>
      <ContentLayout title="Usuários" className="space-y-4">
        <UsersHeader />
        <UsersTable data={data} isLoading={isLoading} />
      </ContentLayout>
    </UsersProvider>
  );
}
