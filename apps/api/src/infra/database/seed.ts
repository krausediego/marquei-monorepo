import { faker } from "@faker-js/faker";
import { auth } from "@/infra/auth";
import { db } from "./client";
import * as schema from "./schema";

const organizationId = "019c8f40-b685-7000-a2ce-982870568a57";

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
