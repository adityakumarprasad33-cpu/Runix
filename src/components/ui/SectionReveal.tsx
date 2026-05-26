"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "down" | "scale" | "float" | "none";
}

const variants = {
  up: { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -24 }, whileInView: { opacity: 1, y: 0 } },
  scale: { initial: { opacity: 0, scale: 0.92 }, whileInView: { opacity: 1, scale: 1 } },
  float: { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } },
  none: { initial: {}, whileInView: {} },
};

export default function SectionReveal({ children, className = "", delay = 0, variant = "up" }: SectionRevealProps) {
  const v = variants[variant];
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
