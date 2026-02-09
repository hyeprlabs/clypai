"use client"

import { motion } from "motion/react";
import { ContactForm } from "@/components/marketing/contact-form";
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
                Contact Us
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="mx-auto mt-6 sm:mt-8 max-w-xl text-balance text-base sm:text-lg text-muted-foreground font-mono px-4 sm:px-0"
              >
                Our support team is available to assist you with any questions
                or issues you may have.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="mx-auto mt-12 w-full max-w-md"
              >
                <ContactForm />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                className="mt-12 sm:mt-16 flex flex-col items-center justify-center gap-4 px-4"
              >
                <h2 className="text-center font-mono text-xs sm:text-sm text-muted-foreground">
                  Find us online:
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    className="flex items-center gap-x-2 rounded-full border bg-card px-3 py-1.5 shadow hover:bg-accent transition-colors"
                    href="/github"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 1024 1024"
                      className="size-3.5 text-muted-foreground"
                    >
                      <path
                        clipRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        transform="scale(64)"
                      />
                    </svg>
                    <span className="font-medium font-mono text-xs tracking-wide">
                      GitHub
                    </span>
                  </a>
                  <a
                    className="flex items-center gap-x-2 rounded-full border bg-card px-3 py-1.5 shadow hover:bg-accent transition-colors"
                    href="/x"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-3.5 text-muted-foreground"
                    >
                      <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
                    </svg>
                    <span className="font-medium font-mono text-xs tracking-wide">
                      X/Twitter
                    </span>
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      <CallToAction />

    </main>
  );
}