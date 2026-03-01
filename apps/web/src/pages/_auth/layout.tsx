import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/better-auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { setTheme } = useTheme();
  setTheme("light");

  return (
    <div className="flex min-h-screen">
      {/* lado esquerdo */}
      <div className="flex w-1/2 flex-col justify-between p-12 bg-accent">
        <Logo />

        {/* depoimento */}
        <div className="flex flex-col gap-4">
          <p className="text-accent-foreground text-lg leading-relaxed">
            "Pare de perder tempo com agendamentos manuais. Foque no que você
            faz de melhor."
          </p>
          <div className="flex items-center gap-3">
            <Avatar className="border border-accent-foreground/60">
              <AvatarImage src="https://avatars.githubusercontent.com/u/95981229?v=4" />
            </Avatar>
            <div>
              <p className="text-accent-foreground font-medium text-sm">
                Diego Krause
              </p>
              <p className="text-accent-foreground/60 text-xs">CTO - Marquei</p>
            </div>
          </div>
        </div>
      </div>

      {/* lado direito */}
      <div className="flex flex-col w-1/2 bg-card">
        <div className="flex flex-col justify-center items-center h-full px-8 md:px-16 lg:px-24">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
