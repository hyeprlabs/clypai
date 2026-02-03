import { betterAuth } from "better-auth";
import { username, organization, admin } from "better-auth/plugins";
import { Pool } from "pg";
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { waitlist } from "better-auth-waitlist";
import { Resend } from "resend";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: 'sandbox'
});

const resend = new Resend(process.env.RESEND_API_KEY);

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
        await resend.emails.send({
          from: "ClypAI <clypai@hyeprlabs.com>",
          to: entry.email,
          subject: "ClypAI Waitlist Status Update",
          text: `Your waitlist status has been updated to: ${entry.status}`
        });
        console.log(`Entry ${entry.id} status changed to ${entry.status}`);
      },
      onJoinRequest: async ({ request }) => {
        await resend.emails.send({
          from: "ClypAI <clypai@hyeprlabs.com>",
          to: request.email,
          subject: "Your join request to the ClypAI Waitlist",
          text: "Thank you for joining the ClypAI waitlist! We'll notify you when we're ready to onboard new users."
        });
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