import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({
  title,
  children,
  className,
}: ContentLayoutProps) {
  return (
    <div className="bg-background h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex flex-1 justify-center">
        <div className={cn("container px-4 sm:px-8", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
