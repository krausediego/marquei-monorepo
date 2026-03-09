import { MenuIcon } from "lucide-react";
import { Menu } from "@/components/admin-panel/menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "../logo";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:w-72 px-3 py-4 h-full flex flex-col"
        side="left"
      >
        <SheetHeader>
          <Logo className="mx-auto" />
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
