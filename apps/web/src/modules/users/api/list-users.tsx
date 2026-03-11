import type { PaginationQuery } from "@repo/shared";
import { client } from "@/lib";

export async function listUsers(query?: PaginationQuery) {
  return client.api.v1.user.get({ query });
}
