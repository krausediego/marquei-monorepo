import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Clientes">
      <div>Clientes</div>
    </ContentLayout>
  );
}
