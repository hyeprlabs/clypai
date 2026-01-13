import { createAuthClient } from "better-auth/react";
import { usernameClient, organizationClient, adminClient } from "better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth/client";
import { waitlistClient } from "better-auth-waitlist";

export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    organizationClient(),
    polarClient(),
    adminClient(),
    waitlistClient()
  ],
})