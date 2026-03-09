import { Scissors } from "lucide-react";
import { cn } from "@/lib";

interface LogoProps {
  isOpen?: boolean;
  className?: string;
}

export function Logo({ isOpen, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="size-8 bg-primary rounded-md flex items-center justify-center">
        <Scissors className="text-primary-foreground" />
      </div>

      <span
        className={cn(
          "text-accent-foreground font-bold text-lg tracking-wide",
          "overflow-hidden whitespace-nowrap",
          isOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
        )}
        style={{
          transition: isOpen
            ? "max-width 500ms ease-in-out, opacity 500ms ease-in-out"
            : "max-width 100ms ease-in-out, opacity 150ms ease-in-out",
        }}
      >
        MARQUEI
      </span>
    </div>
  );
}
