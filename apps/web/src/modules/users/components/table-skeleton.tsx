import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";

export function UsersTableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell className="max-w-12">
              <MoreVertical className="size-4" />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
