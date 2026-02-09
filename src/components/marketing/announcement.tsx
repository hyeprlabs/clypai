"use client"

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";

export function Announcement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Link
        href="/why"
        className="hover:bg-background dark:hover:border-t-border bg-gradient-to-br from-background to-card group mx-auto flex w-fit items-center gap-3 rounded-full border p-1 pl-3 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
      >
        <div className="flex items-center gap-3 text-foreground text-sm">
          <Badge variant="outline">MANIFESTO</Badge>
          <span className="font-mono">Why ClypAI?</span>
        </div>

        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

        <div className="group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
          <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
            <span className="flex size-6">
              <ChevronRight className="m-auto size-3" />
            </span>
            <span className="flex size-6">
              <ChevronRight className="m-auto size-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}