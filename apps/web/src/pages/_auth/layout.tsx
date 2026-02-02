import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Scissors } from "lucide-react";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-row min-h-screen w-full bg-background">
      <div className="flex-1 bg-foreground dark:bg-zinc-900 hidden xl:flex flex-col items-center justify-center">
        <div className="max-w-xl flex flex-col items-center gap-20">
          <div className="flex items-center gap-4">
            <div className="bg-white size-16 rounded-md items-center justify-center flex">
              <Scissors size={40} strokeWidth={3} className="text-black" />
            </div>
            <p className="text-white font-semibold text-4xl">Marquei</p>
          </div>

          <div className="space-y-4">
            <p className="text-white text-center text-lg">
              "O MARQUEI nasceu para resolver um problema real: a falta de
              organização no dia a dia dos salões de beleza. Queremos que a
              tecnologia trabalhe a favor do seu negócio, e não o contrário."
            </p>

            <p className="text-muted-foreground text-center">
              Diego Krause - CTO
            </p>
          </div>
        </div>
      </div>

      <aside className="flex-1 flex flex-col bg-background items-center justify-center px-8 xl:px-0">
        <div className="max-w-lg space-y-8">
          <Outlet />
        </div>
      </aside>
    </div>
  );
}
