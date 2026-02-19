"use client"

import { ReactNode } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

// Providers
import { ThemeProvider } from "@/components/theme-provider";
import { ConsentManager } from "@/app/consent-manager";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { SystemBanner } from "@/components/ui/system-banner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConsentManager>
        <AuthUIProvider
          authClient={authClient}
          navigate={router.push}
          replace={router.replace}
          onSessionChange={() => {
            // Clear router cache (protected routes)
            router.refresh()
          }}
          Link={Link}
        >
          <SystemBanner
            text="Development Mode"
            color="bg-orange-500"
            size="sm"
            show={false}
          />
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
          <Toaster
            position="bottom-center"
          />
          <Analytics />
          <SpeedInsights />
        </AuthUIProvider>
      </ConsentManager>
    </ThemeProvider>
  );
}