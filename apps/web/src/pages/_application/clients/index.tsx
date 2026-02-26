import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { client } from "@/lib/treaty";

export const Route = createFileRoute("/_application/clients/")({
  component: RouteComponent,
});

async function RouteComponent() {
  const { data } = await client.api.v1.organization.get();

  return (
    <ContentLayout title="Clientes">
      <div>Clientes</div>
    </ContentLayout>
  );
}
