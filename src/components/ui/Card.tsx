"use client";

import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: ReactNode;
}

export default function Card({ hover = true, children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm ${
        hover ? "hover:shadow-md hover:border-[var(--primary)]" : ""
      } transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
