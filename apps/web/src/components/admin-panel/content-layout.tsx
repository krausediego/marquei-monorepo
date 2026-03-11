import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="bg-background h-screen">
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="container sm:px-8">{children}</div>
      </div>
    </div>
  );
}
