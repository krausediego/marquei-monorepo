import { Scissors } from "lucide-react";
import { cn } from "@/lib";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="size-8 bg-primary rounded-md flex items-center justify-center">
        <Scissors className="text-primary-foreground" />
      </div>
      <span className="text-accent-foreground font-bold text-lg tracking-wide">
        MARQUEI
      </span>
    </div>
  );
}
