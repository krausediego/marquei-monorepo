import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Usuários">
      <div>Usuários</div>
    </ContentLayout>
  );
}
