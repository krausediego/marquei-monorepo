import { client } from "@/lib";

export async function revokeUser(userId: string) {
  return client.api.v1.member.revoke({ id: userId }).post();
}
