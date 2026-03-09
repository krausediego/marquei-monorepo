"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ThemeSwitcher = React.forwardRef<
  HTMLButtonElement,
  ThemeToggleProps
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
      return;
    }
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("system");
  };

  const getIcon = () => {
    if (theme === "light") {
      return <SunIcon className="size-5" />;
    }
    if (theme === "dark") {
      return <MoonIcon className="size-5" />;
    }
    return <MonitorIcon className="size-5" />;
  };

  if (!mounted) {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        {...props}
        className={cn("size-7 text-sidebar-muted-foreground", className)}
      >
        <MonitorIcon className="size-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      {...props}
      className={cn(
        "size-12 rounded-full text-sidebar-muted-foreground",
        className
      )}
      onClick={cycleTheme}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});

ThemeSwitcher.displayName = "ThemeToggle";
