import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { useUsersContext } from "../contexts";

export function UsersTableSkeleton() {
  const {
    queryStates: [{ limit }],
  } = useUsersContext();

  return (
    <TableBody>
      {Array.from({ length: limit ?? 10 }).map((_, i) => {
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
