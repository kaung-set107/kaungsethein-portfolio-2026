"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type RevealProps = PropsWithChildren<
  HTMLMotionProps<"div"> & {
    delay?: number;
    amount?: number;
  }
>;

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.18,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
