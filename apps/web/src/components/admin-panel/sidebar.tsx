"use client";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Scissors } from "lucide-react";
import { Separator } from "../ui/separator";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-2 left-0 lg:left-2 bg-background rounded-md z-20 h-[calc(100vh-16px)] -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 border",
        !getOpenState() ? "w-22.5" : "w-72",
        settings.disabled && "hidden",
      )}
    >
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 space-y-4"
      >
        <div className="w-full flex justify-center items-center">
          <div className="flex items-center gap-4">
            <div className="bg-foreground size-12 rounded-md items-center justify-center flex">
              <Scissors
                size={24}
                strokeWidth={3}
                className="text-white dark:text-black"
              />
            </div>
            <p className="text-foreground font-semibold text-2xl">Marquei</p>
          </div>
        </div>
        <Separator />
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
