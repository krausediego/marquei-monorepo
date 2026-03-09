"use client";
import { Link } from "@tanstack/react-router";
import { PanelsTopLeft } from "lucide-react";
import { Menu } from "@/components/admin-panel/menu";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full bg-card lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-22.5" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto"
      >
        <Logo className="m-auto" />
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
