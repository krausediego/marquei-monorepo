import { client } from "@/lib";

export function inviteUser(email: string) {
  return client.api.v1.invitation.post({ email });
}
