import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const customFetch: typeof fetch = async (...args) => {
  await delay(2000); // 2 segundos
  return fetch(...args);
};

export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  basePath: "/auth",
  plugins: [
    organizationClient({
      schema: {
        organization: {
          additionalFields: {
            description: { type: "string", required: true },
            state: { type: "string", required: true },
            city: { type: "string", required: true },
            district: { type: "string", required: true },
            street: { type: "string", required: true },
            phone: { type: "string", required: true, unique: true },
            number: { type: "number", required: true },
            location: { type: "json", required: true },
            complement: { type: "string", required: false },
            postalCode: { type: "string", required: false },
          },
        },
      },
    }),
    stripeClient({
      subscription: true,
    }),
  ],
  fetchOptions: {
    credentials: "include",
    customFetchImpl: customFetch,
  },
});
