"use client"

import Link from "next/link";

import { motion } from "motion/react";

import { CircleArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
      style={{
        backgroundImage: "url(/background-auth.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div 
        className="absolute top-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link href="/">
            <CircleArrowLeft className="mr-2" />
            <span>Home</span>
          </Link>
        </Button>
      </motion.div>
      <motion.div 
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}