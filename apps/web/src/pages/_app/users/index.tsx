import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContentLayout title="Usuários">Hello "/_app/users/"!</ContentLayout>;
}
