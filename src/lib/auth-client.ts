import { createAuthClient } from "better-auth/react";
import { usernameClient, organizationClient, adminClient } from "better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth/client";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    organizationClient(),
    polarClient(),
    adminClient()
  ],
})