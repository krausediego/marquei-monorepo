import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/professionals/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Profissionais">
      <div>Profissionais</div>
    </ContentLayout>
  );
}
