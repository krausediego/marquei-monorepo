import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/services/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Serviços">
      <div>Serviços</div>
    </ContentLayout>
  );
}
