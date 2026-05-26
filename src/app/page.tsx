"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Shield, Zap, Cpu, Users, GitBranch, Globe,
  Code2, Sparkles, Layers, ChevronRight,
} from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import HeroAnimation from "@/components/HeroAnimation";
import { TypingAnimation } from "@/registry/magicui/typing-animation";

function GlowCard({ icon: Icon, title, desc, i }: { icon: any; title: string; desc: string; i: number }) {
  return (
    <SectionReveal delay={i * 0.1} variant="float">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        className="group relative h-full rounded-xl border p-7 cursor-default"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-primary), transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--primary-light)" }}>
            <Icon className="w-5.5 h-5.5" style={{ color: "var(--primary)" }} />
          </div>
          <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
        </div>
      </motion.div>
    </SectionReveal>
  );
}

function FloatingStat({ value, label, i }: { value: string; label: string; i: number }) {
  return (
    <SectionReveal delay={i * 0.1} variant="scale">
      <motion.div
        whileHover={{ y: -2 }}
        className="rounded-xl border p-7 text-center"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" }}
          className="text-3xl font-bold mb-1 gradient-primary"
        >
          {value}
        </motion.p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</p>
      </motion.div>
    </SectionReveal>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">

      {/* ─── Cinematic Hero ─── */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow-primary), transparent), radial-gradient(ellipse 40% 30% at 80% 20%, var(--glow-cyan), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
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
                Runix v1.0 — Early Access Now Open
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                The Operating System for{" "}
                <span className="gradient-primary animate-gradient">the Next Era</span>
              </h1>

              <div className="mb-8 min-h-[2.5em]">
                <TypingAnimation
                  words={[
                    "> Initializing future...",
                    "> Building the future of operating systems.",
                    "> Loading Runix kernel modules...",
                    "> Optimizing developer workflow...",
                    "> Creating the next computing ecosystem...",
                    "> Runix v1.0 boot sequence ready.",
                  ]}
                  loop
                  className="text-base md:text-lg font-mono terminal-text"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/community" className="btn btn-primary px-7 py-3 text-base gap-2.5 group">
                  Join Community
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/early-access" className="btn btn-outline px-7 py-3 text-base">
                  Apply for Early Access
                </Link>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.15} variant="scale">
            <HeroAnimation />
          </SectionReveal>
        </div>
      </section>

      {/* ─── What is Runix ─── */}
      <section className="w-full section-padding border-t relative" style={{ borderColor: "var(--border)" }}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What is <span className="gradient-primary">Runix</span>?
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                A ground-up operating system engineered for performance, security, and developer
                experience. Built with a microkernel architecture and a modern UI framework.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard icon={Shield} title="Security-First Architecture" desc="Memory-safe kernel, sandboxed drivers, and mandatory access controls built into every layer." i={0} />
            <GlowCard icon={Zap} title="Blazing Fast Performance" desc="Optimized scheduling, zero-copy IPC, and a lean footprint that runs on everything." i={1} />
            <GlowCard icon={Cpu} title="Modern Developer UX" desc="Native package manager, POSIX compatibility, and first-class support for containers and VMs." i={2} />
          </div>
        </div>
      </section>

      {/* ─── Why Runix is Different ─── */}
      <section className="w-full section-padding border-t" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Runix is <span className="gradient-blue-cyan">Different</span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                We are not just building another Linux distro. Runix is a complete reimagining
                of what an operating system can be.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: GitBranch, title: "Microkernel Design", desc: "Unlike monolithic kernels, Runix keeps the kernel minimal. Drivers, filesystems, and networking run as isolated user-space processes." },
              { icon: Globe, title: "Universal Compatibility", desc: "Run on x86, ARM, and RISC-V with a single build. Full support for Linux, BSD, and POSIX userspace APIs." },
              { icon: Shield, title: "Security by Default", desc: "Every process is sandboxed. Mandatory access controls, verified boot, and automatic security updates out of the box." },
              { icon: Users, title: "Built with Community", desc: "Open-source from day one. Every line of code is public, every decision is discussed, every contributor is welcome." },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1} variant="float">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="group relative rounded-xl border p-7 flex items-start gap-5 cursor-default"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(600px circle at 50% 50%, var(--glow-primary), transparent 60%)" }}
                  />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 relative z-10" style={{ background: "var(--primary-light)" }}>
                    <item.icon className="w-5 h-5" style={{ color: "var(--primary)" }} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Development Roadmap ─── */}
      <section className="w-full section-padding border-t relative" style={{ borderColor: "var(--border)" }}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Development <span className="gradient-purple-indigo">Roadmap</span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Follow our journey from alpha to stable. Runix is being built in the open.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { phase: "Alpha", status: "In Progress", desc: "Core kernel, basic drivers, shell environment", color: "var(--primary)" },
              { phase: "Beta", status: "Q3 2026", desc: "GUI environment, package manager, networking", color: "var(--accent)" },
              { phase: "RC", status: "Q1 2027", desc: "Stable API, security audit, performance tuning", color: "#8b5cf6" },
              { phase: "v1.0", status: "H2 2027", desc: "Production-ready, ecosystem launch", color: "var(--success)" },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1} variant="scale">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative rounded-xl border p-6"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(400px circle at 50% 50%, var(--glow-primary), transparent 60%)" }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="w-full h-1 rounded-full mb-4"
                      style={{ background: item.color }}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    />
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.phase}</h3>
                    <p className="text-xs font-medium mb-3" style={{ color: item.color }}>{item.status}</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link href="/roadmap" className="btn btn-outline group">
                View Full Roadmap
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── Community Preview ─── */}
      <section className="w-full section-padding border-t" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the <span className="gradient-cyan-electric">Community</span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Built by a growing community of developers, designers, and OS enthusiasts.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <FloatingStat value="2,400+" label="Community Members" i={0} />
            <FloatingStat value="180+" label="Contributors" i={1} />
            <FloatingStat value="47" label="Release Builds" i={2} />
          </div>

          <SectionReveal delay={0.3}>
            <div className="text-center">
              <Link href="/community" className="btn btn-primary px-7 py-3 text-base group">
                Join the Discussion
                <Users className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── Early Access CTA ─── */}
      <section className="w-full section-padding border-t relative overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, var(--glow-primary), transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionReveal variant="scale">
            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl border p-12 md:p-16"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-float)",
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-6"
                style={{
                  background: "var(--primary-light)",
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                <Sparkles className="w-3 h-3" />
                Early Access — Limited Slots Available
              </motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Get Early Access to{" "}
                <span className="gradient-primary animate-gradient">Runix v1.0</span>
              </h2>

              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                Be among the first to experience Runix. Early access members get exclusive builds,
                direct access to the development team, and a permanent place in our hall of fame.
              </p>

              <Link href="/early-access" className="btn btn-primary px-8 py-3 text-base group">
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

    </div>
  );
}
