"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Terminal, Cpu, Activity, Wifi, HardDrive } from "lucide-react";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function FloatingParticle({ index }: { index: number }) {
  const initX = seededRandom(index * 7 + 1) * 100;
  const initY = seededRandom(index * 13 + 3) * 100;
  const initOpa = 0.3 + seededRandom(index * 17 + 5) * 0.4;

  const x = useMotionValue(initX);
  const y = useMotionValue(initY);
  const springX = useSpring(x, { stiffness: 30, damping: 15 });
  const springY = useSpring(y, { stiffness: 30, damping: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      x.set(seededRandom(Math.random() * 1000) * 100);
      y.set(seededRandom(Math.random() * 1000 + 1) * 100);
    }, 3000 + index * 500);
    return () => clearInterval(interval);
  }, [x, y, index]);

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: springX,
        top: springY,
        background: "var(--primary)",
        opacity: initOpa,
      }}
    />
  );
}

function SystemWidget({ icon: Icon, label, value, color, delay }: { icon: any; label: string; value: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg border"
      style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
    >
      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: `${color}15` }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div>
        <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{label}</p>
        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
      </div>
    </motion.div>
  );
}

export default function HeroAnimation() {
  const [bootPhase, setBootPhase] = useState(0);
  const bootLines = [
    { text: "[BIOS]  Runix bootloader v1.0.0 — secure boot verified", done: false },
    { text: "[KERNEL] Loading core modules... microkernel initialized", done: false },
    { text: "[MEM]    8192MB detected — page tables mapped, KASLR enabled", done: false },
    { text: "[FS]     Mounting root filesystem — ext4, journaling active", done: false },
    { text: "[NET]    Ethernet link up — 10 Gbps, DHCP lease acquired", done: false },
    { text: "[SVC]    Starting system services — init daemon running", done: false },
    { text: "[OK]     Runix Desktop Environment ready — user space online", done: false },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (bootPhase < bootLines.length) {
      const timeout = setTimeout(() => setBootPhase((p) => p + 1), 400 + Math.random() * 300);
      return () => clearTimeout(timeout);
    }
  }, [bootPhase, bootLines.length]);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[var(--shadow-float)]">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Runix Terminal — v1.0.boot
          </span>
        </div>

        <div className="p-5 font-mono text-xs min-h-[260px]" style={{ background: "var(--bg-primary)" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <p className="mb-3" style={{ color: "var(--text-muted)" }}>
              Runix Boot Sequence v1.0.0 — boot.sys
            </p>
          </motion.div>
          <div className="space-y-2">
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={bootPhase > i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2"
              >
                {bootPhase > i ? (
                  bootPhase === i + 1 && bootPhase < bootLines.length ? (
                    <span className="w-3 h-3 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
                  ) : i === bootLines.length - 1 ? (
                    <span className="text-emerald-500 text-xs">&#9679;</span>
                  ) : (
                    <span className="text-emerald-500 text-xs">&#9679;</span>
                  )
                ) : (
                  <span className="w-3 h-3 rounded-full border border-[var(--border)]" />
                )}
                <span
                  className={i === bootLines.length - 1 && bootPhase > i ? "text-emerald-400 terminal-text" : "text-[var(--text-secondary)]"}
                  style={bootPhase > i && i < bootLines.length - 1 ? { color: "var(--text-secondary)" } : {}}
                >
                  {bootPhase > i ? line.text : ""}
                </span>
              </motion.div>
            ))}
          </div>
          {bootPhase >= bootLines.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-emerald-400 text-xs terminal-text"
            >
              $ runix —status: System ready. Welcome to Runix.
            </motion.p>
          )}
        </div>
      </div>

      {/* Floating system widgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -right-3 top-16 hidden lg:flex flex-col gap-2"
      >
        <SystemWidget icon={Cpu} label="CPU" value="6.2 GHz — 8C/16T" color="var(--primary)" delay={0.8} />
        <SystemWidget icon={Activity} label="MEM" value="4.2 / 8 GB" color="var(--accent)" delay={1.0} />
        <SystemWidget icon={HardDrive} label="DISK" value="64 GB — NVMe" color="#10b981" delay={1.2} />
        <SystemWidget icon={Wifi} label="NET" value="10 Gbps — eth0" color="#8b5cf6" delay={1.4} />
      </motion.div>

      {/* Floating mini terminal */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute -left-3 -bottom-3 w-40 rounded-lg border p-3 shadow-[var(--shadow-float)] hidden lg:block"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-3 h-3" style={{ color: "var(--primary)" }} />
          <span className="text-[10px] font-medium" style={{ color: "var(--text-secondary)" }}>runix shell</span>
        </div>
        <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
          <span style={{ color: "var(--primary)" }}>$</span> ./runix --preview
        </p>
        <p className="text-[10px] font-mono mt-1 terminal-text" style={{ color: "var(--primary)" }}>
          System: Ready
        </p>
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
