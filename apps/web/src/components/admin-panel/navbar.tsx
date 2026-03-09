import { Search } from "lucide-react";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { UserNav } from "@/components/admin-panel/user-nav";
import { ThemeSwitcher } from "../theme-switcher";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export function Navbar() {
  return (
    <header className="sticky top-0 w-full z-10 bg-card backdrop-blur">
      <div className="mx-4 sm:mx-8 flex h-14 md:h-24 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <InputGroup>
            <InputGroupInput
              placeholder="Buscar..."
              className="min-w-auto sm:min-w-sm"
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex flex-1 gap-2 items-center justify-end">
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
