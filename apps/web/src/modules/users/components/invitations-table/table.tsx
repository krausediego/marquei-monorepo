import { Pagination } from "@/components/pagination";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useListInvitations } from "../../hooks";
import { useInvitationsQueryStates } from "../../hooks/use-invitations-query-states";
import { InvitationsTableBody, InvitationsTableHeader } from ".";

export function InvitationsTable() {
  const { data } = useListInvitations();
  const [state, setQueryState] = useInvitationsQueryStates();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          Convites pendentes
        </h1>

        <p className="text-sm text-muted-foreground py-2 px-3 bg-muted rounded-lg">
          {data?.meta.total}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-card border shadow-lg">
        <Table>
          <TableHeader className="bg-background">
            <InvitationsTableHeader />
          </TableHeader>

          <TableBody>
            {data?.data.map((invitation) => (
              <InvitationsTableBody key={invitation.id} data={invitation} />
            ))}
          </TableBody>
        </Table>

        <Pagination
          title="convites"
          setPage={(invitationsPage) => setQueryState({ invitationsPage })}
          setLimit={(invitationsLimit) => setQueryState({ invitationsLimit })}
          limit={state.invitationsLimit}
          page={state.invitationsPage}
          {...data?.meta}
        />
      </div>
    </div>
  );
}
