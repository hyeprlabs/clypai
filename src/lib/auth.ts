import { betterAuth } from "better-auth";
import { username, organization, admin } from "better-auth/plugins";
import { Pool } from "pg";
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { waitlist } from "better-auth-waitlist";
import { Resend } from "resend";
import { whitelistFlag } from "@/lib/flags";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL .env variable!");
}

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error("Missing POLAR_ACCESS_TOKEN .env variable!");
}

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY .env variable!");
}

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox"
});

const resend = new Resend(process.env.RESEND_API_KEY);

const isWhitelist = await whitelistFlag();

export const auth = betterAuth({
  appName: "ClypAI",
  trustedOrigins: [
	  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
	  process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : "",
    "https://*.clypai.com",
    "https://*.clyp.ai",
  ].filter(Boolean),
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
      disableSignInAndSignUp: isWhitelist,
      rateLimit: {
        maxAttempts: 5,
        windowMs: 10 * 60 * 1000,  // 10 minutes
        max: 10,
      },
      onStatusChange: async (entry) => {
        await resend.emails.send({
          to: entry.email,
          template: {
            id: "waitlist-status-1",
            variables: {
              app_url: "https://clypai.com",
              email: entry.email,
              status: entry.status,
            }
          }
        });
        console.log(`Entry ${entry.id} status changed to ${entry.status}`);
      },
      onJoinRequest: async ({ request }) => {
        await resend.emails.send({
          to: request.email,
          template: {
            id: "waitlist-request",
            variables: {
              url: "/status?email=" + encodeURIComponent(request.email),
              status: request.status,
              requested_from: request.email,
              requested_at: request.requestedAt.toISOString(),
            }
          }
        });
        console.log(`New request from ${request.email}`);
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    emailVerification: {
      sendVerificationEmail: async ({ user, token }: { user: { email: string }; token: string }) => {
        await resend.emails.send({
          to: user.email,
          template: {
            id: "verification-code",
            variables: {
              token: token,
              requested_from: user.email,
              requested_at: new Date().toISOString(),
            }
          }
        });
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      disableSignUp: true,
    },
  },
});
