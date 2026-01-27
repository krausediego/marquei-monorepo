import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";
import Stripe from "stripe";
import { db } from "./database/client";
import { env } from "./env";

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});

export const auth = betterAuth({
  basePath: "/auth",
  plugins: [
    openAPI(),
    organization({
      schema: {
        organization: {
          additionalFields: {
            description: { type: "string", required: true },
            phone: { type: "string", required: true, unique: true },
            number: { type: "number", required: true },
            location: { type: "string", required: true },
            complement: { type: "string", required: false },
            postalCode: { type: "string", required: false },
          },
        },
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
    }),
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    password: {
      hash: (password: string) => Bun.password.hash(password),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
});
