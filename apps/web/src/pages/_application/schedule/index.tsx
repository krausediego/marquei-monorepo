import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/schedule/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Agenda">
      <div>Agenda</div>
    </ContentLayout>
  );
}
