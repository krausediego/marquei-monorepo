import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_app/bookings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Agendamentos">Hello "/_app/bookings/"!</ContentLayout>
  );
}
