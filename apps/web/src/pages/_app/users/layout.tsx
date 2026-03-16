import { UsersProvider } from "@/modules/users/contexts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UsersProvider>
      <Outlet />
    </UsersProvider>
  );
}
