import type { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import type { Client } from "@/lib";
import type { Table } from "@tanstack/react-table";
import type { DisclosureResponse } from "@/hooks/use-disclosure";

export type ListUsersResponse = Awaited<
  ReturnType<Client["api"]["v1"]["user"]["get"]>
>["data"];

export type ListUsersData = NonNullable<ListUsersResponse>["data"][number];

export type UsersTableColumns = Pick<
  ListUsersData,
  "id" | "email" | "name" | "image" | "role" | "phoneNumber"
>;

export type UsersContextValue = {
  data?: ListUsersResponse;
  table: Table<UsersTableColumns>;
  selectedId: string | null;
  selectedName: string | null;
  openDialog: (id: string, name: string) => void;
  queryStates: ReturnType<
    typeof useQueryStates<{
      search: typeof parseAsString;
      page: typeof parseAsInteger;
      limit: typeof parseAsInteger;
    }>
  >;
  disclosure: DisclosureResponse;
  handleRevokeUser: () => Promise<void>;
  handleInviteUser: (email: string) => Promise<void>;
  isFetching: boolean;
  isPending: boolean;
};

export interface UserTableMeta {
  onDelete: (id: string, name: string) => void;
  isLoading: boolean;
}
