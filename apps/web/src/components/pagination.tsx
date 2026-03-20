import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

interface PaginationProps {
  title: string;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  total?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  isLoading?: boolean;
}

export function Pagination({
  title,
  page,
  limit,
  total,
  setPage,
  setLimit,
  totalPages,
  hasNextPage,
  hasPrevPage,
  isLoading,
}: PaginationProps) {
  const from = total && total > 0 ? (page - 1) * limit + 1 : 0;
  const to = total ? Math.min(page * limit, total) : 0;

  return (
    <div className="flex items-center justify-between py-4 px-8 border-t">
      <div className="text-sm text-muted-foreground">
        Mostrando {from} a {to} de {total} {title}
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Linhas por páginas</p>
        <Select
          defaultValue={String(limit)}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className="h-8 w-17.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPage(1)}
              disabled={!hasPrevPage || isLoading}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage(page - 1)}
              disabled={!hasPrevPage || isLoading}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <div className="flex w-25 items-center justify-center text-sm font-medium">
              Página {page} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage(page + 1)}
              disabled={!hasNextPage || isLoading}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => setPage(totalPages ?? page)}
              disabled={!hasNextPage || isLoading}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
