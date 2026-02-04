"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { Ellipsis } from "lucide-react";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { Organization } from "../organization/organization";
import { useTheme } from "../theme-provider";
import { Label } from "../ui/label";
import { PlanCard } from "../plans/plan-card";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const menuList = getMenuList();

  return (
    <ScrollArea className="[&>div>div[style]]:block!">
      <nav className="h-full w-full">
        <ul className="flex h-[calc(100vh-48px-36px-16px-6px)] flex-col items-start space-y-1 px-2 lg:h-[calc(100vh-32px-40px-60px)]">
          {/* Fixo no topo */}
          <li className="mb-5 w-full flex-shrink-0">
            <Label>Estabelecimentos</Label>
            <Organization />
          </li>

          {/* Área com scroll */}
          <li className="[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 h-full min-h-0 w-full flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {menuList.map(({ groupLabel, menus }, index) => (
              <div
                className={cn("w-full", groupLabel ? "pt-2" : "")}
                key={index}
              >
                {(isOpen && groupLabel) || isOpen === undefined ? (
                  <p className="text-muted-foreground max-w-62 truncate text-sm font-medium">
                    {groupLabel}
                  </p>
                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="flex w-full items-center justify-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"></p>
                )}
                {menus.map(
                  ({ href, label, icon: Icon, active, submenus }, index) =>
                    !submenus || submenus.length === 0 ? (
                      <div className="w-full" key={index}>
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={
                                  (active === undefined &&
                                    pathname.startsWith(href)) ||
                                  active
                                    ? theme === "dark"
                                      ? "secondary"
                                      : "default"
                                    : "ghost"
                                }
                                className="mb-1 h-12 w-full justify-start"
                                asChild
                              >
                                <Link to={href}>
                                  <span>
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      "max-w-50 truncate",
                                      isOpen === false
                                        ? "-translate-x-96 opacity-0"
                                        : "translate-x-0 opacity-100",
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {isOpen === false && (
                              <TooltipContent side="right">
                                {label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <div className="w-full" key={index}>
                        <CollapseMenuButton
                          icon={Icon}
                          label={label}
                          submenus={submenus}
                          isOpen={isOpen}
                        />
                      </div>
                    ),
                )}
              </div>
            ))}

            {/* Padding no final para não ficar colado */}
            <div className="h-4" />
          </li>

          {/* Fixo no rodapé */}
          <li className="w-full flex-shrink-0 pt-4">
            <PlanCard />
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
