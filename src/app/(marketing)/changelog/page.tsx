"use client";

import { motion } from "motion/react";
import { CallToAction } from "@/components/marketing/call-to-action";
import { BackgroundGlow } from "@/components/marketing/background-glow";

export default function Page() {
  return (
    <main className="overflow-hidden">
      
      <BackgroundGlow />

      <section>
        <div className="relative pt-24 md:pt-36">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">

              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem] font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 py-1"
              >
                Coming Soon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mt-8 max-w-xl text-balance text-lg text-muted-foreground font-mono"
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