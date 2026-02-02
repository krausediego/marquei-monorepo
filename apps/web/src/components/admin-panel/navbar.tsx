import { UserNav } from "@/components/admin-panel/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Notifications } from "../notifications/notifications";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SheetMenu } from "./sheet-menu";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 py-4 w-full bg-background backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0 space-y-0.5">
          <SheetMenu />
          <p className="hidden lg:flex text-muted-foreground text-xs">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>Páginas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </p>
          <h1 className="font-bold text-xl lg:text-3xl">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ModeToggle />
          <Notifications />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
