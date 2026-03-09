import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_app/schedule/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContentLayout title="Agenda">Hello "/_app/schedule/"!</ContentLayout>;
}
