import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useUsersContext } from "@/modules/users/contexts";
import { Pagination } from "@/components/pagination";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  UsersHeader,
  UsersTable,
  UsersAlertDialogRevokeUser,
} from "@/modules/users/components";

export const Route = createFileRoute("/_app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { table, isFetching, disclosure, data } = useUsersContext();

  return (
    <ContentLayout title="Usuários" className="space-y-4">
      <UsersHeader />
      <UsersTable />
      <Pagination table={table} isLoading={isFetching} {...data?.meta} />
      <AlertDialog open={disclosure.isOpen} onOpenChange={disclosure.toggle}>
        <UsersAlertDialogRevokeUser />
      </AlertDialog>
    </ContentLayout>
  );
}
