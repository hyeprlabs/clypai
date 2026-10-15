"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const ease = [0.23, 1, 0.32, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/** Scroll-triggered container. Staggers its `RevealItem` children once in view. */
export function Reveal(props: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={container}
      {...props}
    />
  );
}

type Offset = `${number}px` | `${number}%`;

export function RevealItem({
  offset = "16px",
  ...props
}: React.ComponentProps<typeof motion.div> & { offset?: Offset }) {
  const reduce = useReducedMotion();
  const zero = offset.endsWith("%") ? "0%" : "0px";

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          transform: `translateY(${reduce ? zero : offset})`,
        },
        show: {
          opacity: 1,
          transform: `translateY(${zero})`,
          transition: { duration: 0.6, ease },
        },
      }}
      {...props}
    />
  );
}
