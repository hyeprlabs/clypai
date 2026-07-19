import { createAuthClient } from "better-auth/react";
import { sentinelClient } from "@better-auth/infra/client";
import {
  usernameClient,
  organizationClient,
  adminClient,
} from "better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth/client";

export const authClient = createAuthClient({
  plugins: [
    sentinelClient(),
    usernameClient(),
    organizationClient(),
    polarClient(),
    adminClient(),
  ],
});
