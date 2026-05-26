"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Shield, Monitor, Layers, Package, Terminal } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: Cpu,
    title: "Microkernel Architecture",
    desc: "A minimal kernel with drivers, filesystems, and networking running as isolated user-space processes for maximum stability and security.",
  },
  {
    icon: Shield,
    title: "Memory Safety",
    desc: "Written in Rust, with memory-safe drivers and a type-safe system API. Buffer overflows and use-after-free are compile-time errors.",
  },
  {
    icon: Monitor,
    title: "Modern Desktop",
    desc: "A clean, GPU-accelerated desktop environment with native Wayland support, smooth animations, and a customizable workflow.",
  },
  {
    icon: Layers,
    title: "POSIX Compatible",
    desc: "Full POSIX userspace compatibility means your existing tools, scripts, and workflows work out of the box.",
  },
  {
    icon: Package,
    title: "Native Package Manager",
    desc: "Fast, reproducible, sandboxed package management with flatpak and container-native application support.",
  },
  {
    icon: Terminal,
    title: "Developer Tools",
    desc: "Built-in development tools, native container support, and a powerful shell environment designed for productivity.",
  },
];

const requirements = [
  { label: "Architecture", value: "x86-64, ARM64, RISC-V" },
  { label: "Memory", value: "2 GB minimum (4 GB recommended)" },
  { label: "Storage", value: "8 GB minimum" },
  { label: "Graphics", value: "Vulkan 1.2 or higher" },
  { label: "Display", value: "Any Wayland-compatible GPU" },
];

export default function OsPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* ─── Cinematic Hero ─── */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, var(--glow-primary), transparent), radial-gradient(ellipse 40% 30% at 20% 80%, var(--glow-cyan), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)] pointer-events-none" />

        {/* OS grid pattern overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionReveal variant="up">
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
              Next-Generation OS
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              Runix{" "}
              <span className="gradient-primary animate-gradient">OS</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl font-medium mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Engineered for Performance. Built for Security.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/early-access" className="btn btn-primary px-7 py-3 text-base gap-2 group">
                Get Early Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/roadmap" className="btn btn-outline px-7 py-3 text-base">
                View Roadmap
              </Link>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="w-full section-padding border-t relative" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Core <span className="gradient-blue-cyan">Features</span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Everything you need in a modern operating system, designed from the ground up.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.08} variant="float">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative h-full rounded-xl border p-7 cursor-default"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-primary), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 200 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "var(--primary-light)" }}
                    >
                      <item.icon className="w-5.5 h-5.5" style={{ color: "var(--primary)" }} />
                    </motion.div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── System Requirements + CTA ─── */}
      <section className="w-full section-padding border-t relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, var(--glow-primary), transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal variant="scale">
              <Card hover={false}>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
                      <Layers className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      System Requirements
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {requirements.map((req, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex items-center justify-between py-3 border-b"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {req.label}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {req.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2} variant="up">
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-5"
                  style={{
                    background: "var(--primary-light)",
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Early Access Now Open
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to try{" "}
                  <span className="gradient-primary">Runix</span>?
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Early access is now open for developers, enthusiasts, and early
                  adopters. Join the waitlist and be among the first to experience
                  the future of computing.
                </p>
                <Link
                  href="/early-access"
                  className="btn btn-primary px-7 py-3 text-base gap-2.5 group"
                >
                  Apply for Early Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
