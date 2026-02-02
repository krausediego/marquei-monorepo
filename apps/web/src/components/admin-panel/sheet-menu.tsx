import { MenuIcon, Scissors } from "lucide-react";
import { Menu } from "@/components/admin-panel/menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader className="flex items-center">
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
          <Separator />
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
