import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/_application")({
  beforeLoad: async () => {
    const { data: session } = await auth.getSession();

    return {
      user: {
        id: session?.user.id,
        name: session?.user.name,
        image: session?.user.image,
      },
    };
  },
  loader: async ({ context }) => {
    if (!context.user.id) {
      throw redirect({ to: "/sign-in" });
    }
    return {
      userId: context.user.id,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
