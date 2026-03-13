import { faker } from "@faker-js/faker";
import { auth } from "@/infra/auth";
import { db } from "./client";
import * as schema from "./schema";

const organizationId = "019ce2d1-0052-7000-9656-c9629ab57d0e";

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
        phoneNumber: faker.phone.number({ style: "national" }),
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
