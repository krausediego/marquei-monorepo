import { PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute top-5.5 -right-10 z-20">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md size-9"
        variant="ghost"
        size="icon"
      >
        <PanelRightOpen
          className={cn(
            "size-6 transition-transform ease-in-out duration-700 text-muted-foreground",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
