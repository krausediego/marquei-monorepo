import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/reviews/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Avaliações">
      <div>Avaliações</div>
    </ContentLayout>
  );
}
