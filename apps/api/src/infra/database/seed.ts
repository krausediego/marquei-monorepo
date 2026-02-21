import { faker } from "@faker-js/faker";
import { auth } from "@/auth";
import { db } from "./client";
import * as schema from "./schema";

const organizationId = "019c283e-9f1a-7000-aca0-4cdce7ef6bda";

/**
 * Create users
 */
await Promise.all(
  Array.from({ length: 6 }).map(async () => {
    const { user } = await auth.api.signUpEmail({
      body: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        image: faker.image.avatar(),
      },
    });

    await db.insert(schema.members).values({
      userId: user.id,
      organizationId,
      createdAt: new Date(),
    });
  })
);

process.exit();
