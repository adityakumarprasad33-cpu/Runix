"use client";

import { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "error";
  children: ReactNode;
}

const variants = {
  default: "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border)]",
  primary: "bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]/20",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  error: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
};

export default function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
