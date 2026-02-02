import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_application/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Dashboard">
      <div>Diego</div>
    </ContentLayout>
  );
}
