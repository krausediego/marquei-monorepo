import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Produtos">
      <div>Produtos</div>
    </ContentLayout>
  );
}
