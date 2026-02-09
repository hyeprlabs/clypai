"use client"

import Image from "next/image";

import { motion } from "motion/react";

import { BorderBeam } from "@/components/ui/border-beam";

import { BackgroundGlow } from "@/components/marketing/background-glow";

import { Announcement } from "@/components/marketing/announcement";

import { Features } from "@/components/marketing/features";

import { WaitlistForm } from "@/components/marketing/waitlist-form";

export default function Page() {
  return (
    <main className="overflow-hidden">
      
      <BackgroundGlow />
      
      <section>
        <div className="relative pt-16 sm:pt-24 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
          >
            <Image
              src="/background.jpg"
              alt="background"
              className="hidden size-full dark:block"
              width={3276}
              height={4095}
            />
          </motion.div>

          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">

              <Announcement />

              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="mx-auto mt-6 sm:mt-8 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-md:font-semibold font-serif bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 py-1 px-4 sm:px-0"
              >
                From Raw Video to Viral Clips in One Click.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                Automate your short-form content. ClypAI finds the hooks, adds
                captions, and crops for social, cutting your editing time
                <span className="font-bold text-foreground"> 90%</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="mt-12 flex flex-col items-center justify-center gap-6"
              >
                
                <WaitlistForm />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="mask-b-from-55% relative mt-8 overflow-hidden px-2 sm:px-4 sm:mt-12 md:mt-20">
              <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-xl sm:rounded-2xl border p-2 sm:p-4 shadow-lg shadow-zinc-950/15 ring-1">
                
                <Image
                  className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                  src="/mail2.webp"
                  alt="app screen"
                  width={2700}
                  height={1440}
                />

                <Image
                  className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                  src="/mail2.webp"
                  alt="app screen"
                  width={2700}
                  height={1440}
                />

                <BorderBeam
                  duration={24}
                  size={300}
                  className="from-transparent via-foreground to-transparent"
                />

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <Features />
        </motion.div>
      </section>
    </main>
  );
}