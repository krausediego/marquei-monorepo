import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UsersHeader, UsersTable } from "@/modules/users/components";

export const Route = createFileRoute("/_app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout header={<UsersHeader />} className="space-y-4">
      <UsersTable />
      {/* <Pagination /> */}
      {/* <AlertDialog
        open={disclosure.isOpen}
        onOpenChange={disclosure.toggle}
      >
        <UsersAlertDialogRevokeUser />
      </AlertDialog> */}
    </ContentLayout>
  );
}
