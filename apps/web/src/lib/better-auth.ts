import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3333/api/v1/auth",
  plugins: [phoneNumberClient()],
});
