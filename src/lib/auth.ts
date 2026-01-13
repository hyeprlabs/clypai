import { betterAuth } from "better-auth";
import { username, organization, admin } from "better-auth/plugins";
import { Pool } from "pg";
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { waitlist } from "better-auth-waitlist";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: 'sandbox'
});

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  plugins: [
    username(),
    organization(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "3ec54eb9-420c-433f-9500-bf36e2f65f4a",
              slug: "pro"
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true
        }),
        portal(),
        usage()
      ],
    }),
    admin(),
    waitlist({
      enabled: true,
      maximumWaitlistParticipants: 1000,
      disableSignInAndSignUp: true,
      rateLimit: {
        maxAttempts: 5,
        windowMs: 10 * 60 * 1000,  // 10 minutes
        max: 10,
      },
      validateEntry: async ({ email, additionalData }) => {
        // Custom business logic
        return email.includes("admin") || additionalData?.priority === "high";
      },
      onStatusChange: async (entry) => {
        // Send notification emails
        console.log(`Entry ${entry.id} status changed to ${entry.status}`);
      },
      onJoinRequest: async ({ request }) => {
        // Handle new join requests
        console.log(`New request from ${request.email}`);
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});