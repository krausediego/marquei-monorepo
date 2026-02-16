import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { AuthProvider } from "@/contexts/auth-context";
import { auth } from "@/lib/auth";
import { queryClient } from "@/lib/query-client";
import { AdminPanelSkeleton } from "@/components/admin-panel/admin-panel-skeleton";
import { useNotificationStream } from "@/hooks/use-notification-stream";

export const Route = createFileRoute("/_application")({
  loader: async () => {
    return queryClient.ensureQueryData({
      queryKey: ["auth", "session"],
      queryFn: async () => {
        const { data: session } = await auth.getSession();
        if (!session?.user) {
          throw redirect({ to: "/sign-in" });
        }
        return session;
      },
      staleTime: 5 * 60 * 1000, // 5 minutos
    });
  },
  pendingComponent: AdminPanelSkeleton,
  pendingMs: 200,
  pendingMinMs: 500,
  component: RouteComponent,
});

function RouteComponent() {
  useNotificationStream();

  return (
    <AuthProvider>
      <AdminPanelLayout>
        <Outlet />
      </AdminPanelLayout>
    </AuthProvider>
  );
}
