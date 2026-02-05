import { Suspense } from "react";
import { motion } from "motion/react";
import { BackgroundGlow } from "@/components/marketing/background-glow";
import { PricingSection } from "@/components/marketing/pricing/pricing-section";

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
                Pricing
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                Simple, transparent pricing. Start for free and scale as you grow.
                Choose the plan that fits your needs, from individual creators
                to large organizations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mx-auto mt-12"
              >
                <motion.div 
                  initial="rest"
                  whileHover="hover"
                  className="relative"
                >
                  <Suspense>
                    <PricingSection />
                  </Suspense>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}