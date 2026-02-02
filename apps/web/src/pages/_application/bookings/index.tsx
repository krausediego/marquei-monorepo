import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/bookings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Agendamentos">
      <div>Agendamentos</div>
    </ContentLayout>
  );
}
