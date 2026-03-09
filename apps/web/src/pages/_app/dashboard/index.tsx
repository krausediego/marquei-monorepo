import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setIsOpen } = useSidebar();

  return (
    <ContentLayout title="Dashboard">
      <Button onClick={() => setIsOpen(true)}>Fechar</Button>
    </ContentLayout>
  );
}
