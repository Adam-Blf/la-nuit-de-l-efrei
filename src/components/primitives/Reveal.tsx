"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE } from "@/lib/tokens";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "h3" | "p" | "span" | "li";
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.8,
  className,
  as = "div",
}: Props) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}
