import { db } from "@/database/client";
import * as schema from "@/database/schema";
import { sendNotificationToUser } from "@/helpers/send-notification";
import { addDays } from "date-fns";

interface InviteMembersProps {
  organizationId: string;
  userId: string;
  email: string;
}

export async function inviteMembersFunction({
  organizationId,
  userId,
  email,
}: InviteMembersProps) {
  const userToInvite = await db.query.users.findFirst({
    where(fields, { eq }) {
      return eq(fields.email, email);
    },
  });

  if (!userToInvite) {
    throw new Error("User not found");
  }

  const [invite] = await db
    .insert(schema.invitations)
    .values({
      organizationId,
      inviterId: userId,
      role: "member",
      email,
      status: "pending",
      expiresAt: addDays(new Date(), 2),
      createdAt: new Date(),
    })
    .returning();

  sendNotificationToUser(userToInvite.id, {
    type: "organization_invite",
    data: invite,
  });

  return invite;
}
