import { client } from "@/lib";

export async function usersOverview() {
  return client.api.v1.user.overview.get();
}
