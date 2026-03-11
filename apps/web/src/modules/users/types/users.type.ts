import type { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import type { Client } from "@/lib";

export type ListUsersResponse = Awaited<
  ReturnType<Client["api"]["v1"]["user"]["get"]>
>["data"];

export type ListUsersData = NonNullable<ListUsersResponse>["data"][number];

export type UsersTableColumns = Pick<
  ListUsersData,
  "id" | "email" | "name" | "image" | "role"
>;

export type UsersContextValue = {
  data?: ListUsersResponse;
  queryStates: ReturnType<
    typeof useQueryStates<{
      search: typeof parseAsString;
      page: typeof parseAsInteger;
      limit: typeof parseAsInteger;
    }>
  >;
};
