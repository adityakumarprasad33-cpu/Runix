"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const phases = [
  {
    phase: "Alpha",
    status: "in-progress",
    date: "Current",
    description:
      "Core kernel development, basic device drivers, minimal shell environment, and initial build system.",
    items: [
      { title: "Microkernel implementation", done: true },
      { title: "Memory management (VMM)", done: true },
      { title: "Process scheduler", done: true },
      { title: "Interrupt handling", done: true },
      { title: "Basic x86-64 drivers", done: true },
      { title: "ARM64 boot support", done: false },
      { title: "Shell environment", done: false },
      { title: "Init system", done: false },
    ],
  },
  {
    phase: "Beta",
    status: "upcoming",
    date: "Q3 2026",
    description:
      "Desktop environment, package management, networking stack, and developer toolchain.",
    items: [
      { title: "Wayland compositor", done: false },
      { title: "Desktop environment (alpha)", done: false },
      { title: "Package manager", done: false },
      { title: "TCP/IP networking stack", done: false },
      { title: "POSIX compatibility layer", done: false },
      { title: "RISC-V support", done: false },
    ],
  },
  {
    phase: "Release Candidate",
    status: "planned",
    date: "Q1 2027",
    description:
      "API stabilization, security audit, performance optimization, and ecosystem tooling.",
    items: [
      { title: "Stable syscall API", done: false },
      { title: "Comprehensive security audit", done: false },
      { title: "Performance benchmarking", done: false },
      { title: "Documentation release", done: false },
      { title: "SDK and developer tools", done: false },
    ],
  },
  {
    phase: "v1.0 Stable",
    status: "planned",
    date: "H2 2027",
    description:
      "Production-ready release, application ecosystem, and community infrastructure.",
    items: [
      { title: "Stable kernel API", done: false },
      { title: "Application store (beta)", done: false },
      { title: "Long-term support commitment", done: false },
      { title: "Enterprise features", done: false },
    ],
  },
];

const statusConfig = {
  "in-progress": {
    icon: Clock,
    color: "var(--primary)",
    label: "In Progress",
  },
  upcoming: {
    icon: Circle,
    color: "var(--accent)",
    label: "Upcoming",
  },
  planned: {
    icon: Circle,
    color: "var(--text-muted)",
    label: "Planned",
  },
};

function ProgressBar({ progress, color, delay }: { progress: number; color: string; delay: number }) {
  return (
    <div className="w-full h-1.5 rounded-full mb-5" style={{ background: "var(--border)" }}>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${color}, var(--accent))`,
          boxShadow: `0 0 12px ${color}40`,
        }}
      />
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -10%, var(--glow-primary), transparent), radial-gradient(ellipse 40% 30% at 80% 80%, var(--glow-cyan), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-7"
              style={{
                background: "var(--primary-light)",
                borderColor: "var(--primary)",
                color: "var(--primary)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              Built in the Open
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Development{" "}
              <span className="gradient-primary animate-gradient">Roadmap</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Runix is being built in the open. Here is our planned development
              timeline — from alpha to stable release.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="w-full section-padding border-t relative" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          {phases.map((phase, pIdx) => {
            const cfg = statusConfig[phase.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            const doneCount = phase.items.filter((i) => i.done).length;
            const progress = Math.round((doneCount / phase.items.length) * 100);

            return (
              <SectionReveal key={pIdx} delay={pIdx * 0.12} variant="up">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="group relative rounded-xl border overflow-hidden"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(800px circle at 50% 50%, var(--glow-primary), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10 p-8">
                    {/* Animated progress bar */}
                    <ProgressBar progress={progress} color={cfg.color} delay={0.3 + pIdx * 0.12} />

                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <motion.h2
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + pIdx * 0.12, duration: 0.4 }}
                            className="text-2xl font-bold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {phase.phase}
                          </motion.h2>
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 + pIdx * 0.12, duration: 0.3 }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${cfg.color}15`,
                              color: cfg.color,
                            }}
                          >
                            <Icon className="w-3 h-3" />
                            {cfg.label}
                          </motion.span>
                        </div>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{phase.date}</p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + pIdx * 0.12 }}
                        className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                        style={{
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                        }}
                      >
                        {doneCount}/{phase.items.length} done
                      </motion.div>
                    </div>

                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {phase.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.items.map((item, iIdx) => (
                        <motion.div
                          key={iIdx}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + iIdx * 0.04 + pIdx * 0.12, duration: 0.3 }}
                          className="flex items-center gap-2.5 py-1.5"
                        >
                          {item.done ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 + iIdx * 0.04 + pIdx * 0.12, type: "spring", stiffness: 300 }}
                            >
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--success)" }} />
                            </motion.span>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 shrink-0" style={{ borderColor: "var(--border)" }} />
                          )}
                          <span
                            className={`text-sm ${
                              item.done
                                ? "font-medium"
                                : ""
                            }`}
                            style={{
                              color: item.done ? "var(--text-primary)" : "var(--text-muted)",
                            }}
                          >
                            {item.title}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
