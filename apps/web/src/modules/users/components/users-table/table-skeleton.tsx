import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export function UsersTableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell className="w-125 pl-8">
              <Skeleton className="h-14 w-48" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell className="w-20 pr-8 text-end">
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
