import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_app/clients/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Clientes">Hello "/_app/clients/"!</ContentLayout>
  );
}
