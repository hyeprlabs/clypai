# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Development server with Turbopack
pnpm build        # Production build with Turbopack
pnpm start        # Production server
pnpm lint         # ESLint
pnpm email:dev    # React Email preview server
```

Set up env by copying `.env.example` to `.env.local`.

## Architecture

**ClypAI** is an AI-powered video clipping SaaS built on Next.js App Router with route groupings:

- `(marketing)` — Public landing, blog, pricing, legal pages
- `(auth)` — Login/signup pages
- `(dashboard)` — Authenticated app with sections: overview, brand-kits, connections, create, metrics, profile, projects, settings, workers
- `(modes)` — Maintenance and coming-soon pages
- `/api` — Auth, contact, search, well-known routes

## Key Systems

**Authentication** — Better Auth (`/src/lib/auth.ts` server, `/src/lib/auth-client.ts` client) with plugins: username, organization, admin, waitlist. GitHub OAuth + email/password. Organizations are auto-created on signup.

**Feature Flags & Middleware** — `/src/proxy.ts` handles route protection and feature flags via Vercel Edge Config. Flags: `whitelist`, `maintenance`, `coming-soon`. Admins bypass maintenance/coming-soon.

**Subscriptions** — Polar SDK (`@polar-sh/sdk`) with Better Auth integration for subscription management and customer portal.

**Database** — PostgreSQL via `pg` driver. Better Auth manages sessions and user data in the database.

**Email** — Resend for delivery, React Email templates in `/emails/`, server actions in `/src/actions/send.ts`. Preview at `localhost:3000` with `pnpm email:dev`.

**Workflows** — `/src/workflows/` uses the `workflow` package (Trigger.dev style) with `"use workflow"` directive for distributed async jobs (e.g., contact form processing with bot detection).

**Content** — Fumadocs MDX for blog and legal pages. Collections defined in `source.config.ts` with Zod-validated frontmatter. MDX files live in `/content/`.

**UI** — shadcn/ui components in `/src/components/ui/`, Radix UI primitives, Tailwind CSS 4, CVA for variants, Motion (Framer Motion) for animations.

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` — PostgreSQL connection
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — Auth server config
- `GITHUB_CLIENT_ID/SECRET` — GitHub OAuth
- `RESEND_API_KEY` — Email delivery
- `POLAR_ACCESS_TOKEN`, `POLAR_SUCCESS_URL` — Payments
- `EDGE_CONFIG` — Vercel Edge Config for feature flags
- `DISCORD_WEBHOOK_URL` — Notifications

## Path Aliases

- `@/*` → `./src/*`
- `fumadocs-mdx:collections/*` → `./.source/*`
