import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useListUsers } from "../../hooks";
import { UsersTableBody, UsersTableHeader, UsersTableSkeleton } from ".";

export function UsersTable() {
  const { data, isLoading, isRefetching } = useListUsers();
  const isFetching = isLoading || isRefetching;

  return (
    <div className="overflow-hidden rounded-xl bg-card border shadow-lg">
      <Table>
        <TableHeader className="bg-background">
          <UsersTableHeader />
        </TableHeader>

        {isFetching ? (
          <UsersTableSkeleton />
        ) : (
          <TableBody>
            {data?.data.map((user) => (
              <UsersTableBody key={user.id} data={user} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
