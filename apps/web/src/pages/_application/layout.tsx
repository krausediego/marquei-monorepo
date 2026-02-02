import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { AuthProvider } from "@/contexts/auth-context";
import { auth } from "@/lib/auth";
import { queryClient } from "@/lib/query-client";

export const Route = createFileRoute("/_application")({
  beforeLoad: async () => {
    const { data: session } = await auth.getSession();

    if (!session?.user) {
      throw redirect({ to: "/sign-in" });
    }

    queryClient.setQueryData(["auth", "session"], session);

    return { session };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <AdminPanelLayout>
        <Outlet />
      </AdminPanelLayout>
    </AuthProvider>
  );
}
