import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { UserNav } from "@/components/admin-panel/user-nav";
import { ThemeSwitcher } from "../theme-switcher";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-card backdrop-blur">
      <div className="mx-4 sm:mx-8 flex h-14 md:h-18 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 gap-2 items-center justify-end">
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
