import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_application/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useLoaderData({ from: "/_application" });

  return <div>{userId}</div>;
}
