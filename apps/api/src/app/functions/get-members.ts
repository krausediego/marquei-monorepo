import { and, asc, desc, eq, like, or } from "drizzle-orm";
import { db } from "@/database/client";
import * as schema from "@/database/schema";

interface GetMembersFunctionProps {
  organizationId: string;
  search?: string;
  orderBy?: "createdAt" | "name";
  orderDirection?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export async function getMembersFunction({
  organizationId,
  search,
  orderBy = "createdAt",
  orderDirection = "asc",
  page = 1,
  limit = 20,
}: GetMembersFunctionProps) {
  const offset = (page - 1) * limit;

  const orderColumn =
    orderBy === "name" ? schema.users.name : schema.users.createdAt;
  const orderFn = orderDirection === "desc" ? desc : asc;

  const data = await db
    .select({
      id: schema.users.id,
      name: schema.users.name,
      email: schema.users.email,
      emailVerified: schema.users.emailVerified,
      image: schema.users.image,
      stripeCustomerId: schema.users.stripeCustomerId,
      role: schema.members.role,
      createdAt: schema.users.createdAt,
      updatedAt: schema.users.updatedAt,
    })
    .from(schema.users)
    .innerJoin(schema.members, eq(schema.users.id, schema.members.userId))
    .where(
      and(
        eq(schema.members.organizationId, organizationId),
        search
          ? or(
              like(schema.users.name, `%${search}%`),
              like(schema.users.email, `%${search}%`)
            )
          : undefined
      )
    )
    .orderBy(orderFn(orderColumn))
    .limit(limit)
    .offset(offset);

  return data;
}
