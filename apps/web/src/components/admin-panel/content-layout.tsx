import type { ReactNode } from "react";
import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib";

interface ContentLayoutProps {
  header: ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({
  header,
  children,
  className,
}: ContentLayoutProps) {
  return (
    <div className="bg-background h-screen">
      <Navbar />
      <div className="flex flex-1 justify-center">
        <div className={cn("container px-4 sm:p-8", className)}>
          {header}
          {children}
        </div>
      </div>
    </div>
  );
}
