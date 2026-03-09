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

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const { pathname } = useLocation();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:block!">
      <nav className="mt-4 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-0" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-0 pb-2 max-w-62 truncate">
                  {groupLabel}
                </p>
              ) : (
                !isOpen &&
                isOpen !== undefined &&
                groupLabel && <p className="pb-2" />
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
                                  ? "default"
                                  : "ghost"
                              }
                              className={cn(
                                "w-full h-13 mb-1",
                                isOpen && "justify-start"
                              )}
                              asChild
                            >
                              <Link to={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={22} />
                                </span>
                                {isOpen && (
                                  <p className="max-w-50 truncate font-light">
                                    {label}
                                  </p>
                                )}
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
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
