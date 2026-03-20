import type { Client } from "@/lib";

export type ListUsersResponse = Awaited<
  ReturnType<Client["api"]["v1"]["user"]["get"]>
>["data"];

export type ListUsersData = NonNullable<ListUsersResponse>["data"][number];

export type ListInvitationsResponse = Awaited<
  ReturnType<Client["api"]["v1"]["invitation"]["get"]>
>["data"];

export type ListInvitationsData =
  NonNullable<ListInvitationsResponse>["data"][number];
