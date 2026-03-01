import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/better-auth";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }

    return { ...session };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
