// components/admin-panel/admin-panel-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function AdminPanelSkeleton() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <aside className="bg-background w-64 border-r p-4">
        <Skeleton className="mb-6 h-8 w-32" /> {/* Logo */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b p-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Skeleton className="mb-4 h-10 w-64" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </main>
      </div>
    </div>
  );
}
