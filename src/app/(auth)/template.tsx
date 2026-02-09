"use client"

import Link from "next/link";

import { motion } from "motion/react";

import { CircleArrowLeft } from "lucide-react";

import { BackgroundGlow } from "@/components/marketing/background-glow";

import { Button } from "@/components/ui/button";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="overflow-hidden">
      
      <BackgroundGlow />

      <section>
        <div className="relative flex flex-col min-h-svh items-center justify-center gap-6 p-6 md:p-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
          />

          <motion.div
            className="absolute left-6 top-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link href="/">
              <Button variant="outline" size="sm" className="rounded-full cursor-pointer">
                <CircleArrowLeft className="mr-2" />
                Home
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {children}
          </motion.div>

        </div>
      </section>
    </main>
  );
}