"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import { Code2, Heart, Shield, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Security First",
    desc: "We believe security is not a feature — it is a foundation. Every line of code is written with safety in mind.",
  },
  {
    icon: Heart,
    title: "Open by Default",
    desc: "Runix is fully open-source. Our code, our roadmap, and our decisions are transparent to the community.",
  },
  {
    icon: Code2,
    title: "Developer Obsession",
    desc: "We build for developers first. Great developer experience creates great software ecosystems.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Design",
    desc: "Every design decision is intentional. We value simplicity, consistency, and elegance over complexity.",
  },
];

const milestones = [
  { year: "2025", event: "Project started — first kernel prototype boots on x86-64 hardware." },
  { year: "2026", event: "Alpha release, community launch, 2,400+ members, ARM64 support." },
  { year: "2027", event: "v1.0 Stable — production-ready release with full ecosystem." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, var(--glow-primary), transparent), radial-gradient(ellipse 40% 30% at 80% 20%, var(--glow-cyan), transparent)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)] pointer-events-none" />

        {/* Floating "Since 2025" badge */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="absolute top-32 right-8 lg:right-20 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-float)",
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>Since</span>
            <span className="font-bold gradient-primary">2025</span>
          </motion.div>
        </motion.div>

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
              Our Story
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              About{" "}
              <span className="gradient-primary animate-gradient">Runix</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Runix was founded with a simple belief: the operating system should
              be invisible, reliable, and empowering. We are building the platform
              that the next generation of computing deserves.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="w-full section-padding border-t relative" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="gradient-blue-cyan">Values</span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                The principles that guide every decision we make.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1} variant="float">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative h-full rounded-xl border p-7 text-center cursor-default"
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
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: "var(--primary-light)" }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: "var(--primary)" }} />
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

      {/* ─── Story ─── */}
      <section className="w-full section-padding border-t relative" style={{ borderColor: "var(--border)" }}>
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="gradient-primary">Story</span>
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>
                  Runix started in early 2025 as a small research project exploring
                  microkernel design and memory-safe systems programming. What
                  began as a weekend experiment quickly grew into something larger
                  as we realized the potential for a truly modern operating system.
                </p>
                <p>
                  Today, Runix is being developed by a distributed team of systems
                  engineers, kernel hackers, and UI designers who share a common
                  vision: to build an OS that is secure by default, performant
                  by design, and open by nature.
                </p>
                <p>
                  We are not trying to replace Linux or Windows overnight. We are
                  building a foundation for the future — one careful commit at a
                  time.
                </p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.15} variant="scale">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative rounded-xl border p-6 flex items-start gap-5 cursor-default"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(400px circle at 50% 50%, var(--glow-primary), transparent 60%)",
                    }}
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                    className="text-2xl font-bold shrink-0 w-20 relative z-10"
                    style={{ color: "var(--primary)" }}
                  >
                    {item.year}
                  </motion.span>
                  <div className="relative z-10">
                    <div
                      className="w-0.5 h-full absolute left-0 top-0 rounded-full"
                      style={{ background: "var(--border)" }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
