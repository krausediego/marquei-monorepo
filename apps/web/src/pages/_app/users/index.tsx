import { createFileRoute } from "@tanstack/react-router";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  InvitationsTable,
  UsersHeader,
  UsersOverview,
  UsersTable,
} from "@/modules/users/components";

export const Route = createFileRoute("/_app/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout header={<UsersHeader />} className="space-y-10">
      <UsersOverview />
      <UsersTable />
      <InvitationsTable />
    </ContentLayout>
  );
}
