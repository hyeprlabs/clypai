"use client";

import { motion } from "motion/react";
import { CallToAction } from "@/components/marketing/call-to-action";
import { BackgroundGlow } from "@/components/marketing/background-glow";

export default function Page() {
  return (
    <main className="overflow-hidden">
      
      <BackgroundGlow />

      <section>
        <div className="relative pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 md:pb-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">

              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mt-6 sm:mt-8 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-md:font-semibold font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 py-1"
              >
                Coming Soon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                This page is currently under development. Stay tuned for updates!
              </motion.p>

            </div>
          </div>
        </div>
      </section>

      <CallToAction />

    </main>
  );
}