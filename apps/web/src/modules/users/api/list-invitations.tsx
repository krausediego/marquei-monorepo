import type { PaginationQuery } from "@repo/shared";
import { client } from "@/lib";

export async function listInvitations(query?: PaginationQuery) {
  return client.api.v1.invitation.get({ query });
}
