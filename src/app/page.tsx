"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Network, Zap, Boxes, Shield, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Particle Network Background Component
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = Math.floor(width / 20);
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden bg-[#020203]">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <ParticleNetwork />
        
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-runix-cyan/5 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-runix-purple/10 rounded-full blur-[150px] mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-xs font-bold tracking-[0.2em] text-runix-cyan mb-24 uppercase backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-runix-cyan animate-[ping_2s_infinite]" />
            RUNIX CORE v1 : UPCOMING
          </motion.div>

          {/* Center Visual */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-runix-cyan/20 blur-[100px] rounded-full" />
            <div className="relative z-10 w-40 h-40 rounded-full border-2 border-runix-cyan/20 flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.15)] bg-[#050508]/60 backdrop-blur-2xl">
              <div className="w-28 h-28 rounded-full border border-runix-purple/30 flex items-center justify-center bg-runix-cyan/5 animate-[spin_20s_linear_infinite_reverse]">
                <div className="w-full h-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="w-16 h-16 relative flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.8)] rounded-xl bg-[#050508] border border-runix-cyan/50">
                    <span className="font-mono text-4xl font-bold text-runix-cyan">R</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Orbiting particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 border border-white/[0.03] rounded-full pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-runix-cyan shadow-[0_0_10px_#06b6d4] rounded-full -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Adaptive Intelligence <br className="hidden md:block" />
            <span className="text-gradient">For Future Systems</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            RUNIX is building a modular AI ecosystem designed for orchestration, edge intelligence, robotics integration, and adaptive execution across future computing systems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/ecosystem" className="w-full sm:w-auto px-8 py-4 rounded-full bg-runix-cyan text-slate-950 font-bold tracking-wide hover:bg-runix-cyan/90 transition-all flex items-center justify-center gap-2 neon-border shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              Explore Ecosystem <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/technology" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-bold tracking-wide hover:bg-white/10 transition-all">
              View Technology
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full text-slate-300 font-bold tracking-wide hover:text-white transition-all">
              Contact Us
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-runix-cyan/50 to-transparent"
        />
      </section>

      {/* SECTION 1 — VISION */}
      <section className="w-full py-32 px-6 relative border-t border-white/5 bg-[#050508]/40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Beyond Software. <br/><span className="text-runix-purple">Beyond Automation.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 leading-relaxed"
          >
            RUNIX is designing adaptive AI infrastructure for future intelligent systems — combining orchestration, modular intelligence, robotics integration, and edge execution into one evolving ecosystem.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — ECOSYSTEM */}
      <section className="w-full py-32 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">A Modular Ecosystem Built For Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Employees", icon: Terminal, color: "runix-cyan" },
              { title: "Adaptive Runtime", icon: Cpu, color: "blue-500" },
              { title: "Edge Intelligence", icon: Network, color: "orange-500" },
              { title: "Robotics Integration", icon: Zap, color: "yellow-500" },
              { title: "Autonomous Infrastructure", icon: Boxes, color: "runix-purple" },
              { title: "Cross Platform Systems", icon: Shield, color: "emerald-500" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
              >
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${feature.color}/10 rounded-full blur-[30px] group-hover:bg-${feature.color}/20 transition-all`} />
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-full transition-all duration-700 opacity-50" style={{ color: `var(--color-${feature.color})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — TECHNOLOGY */}
      <section className="w-full py-32 px-6 relative border-t border-white/5 bg-[#050508]/40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Engineered For <span className="text-gradient">The Future</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 leading-relaxed"
          >
            Built around orchestration, adaptive execution, and intelligent infrastructure, RUNIX represents a new approach to modular AI ecosystems.
          </motion.p>
        </div>
      </section>

      {/* SECTION 4 — FUTURE SYSTEMS */}
      <section className="w-full py-32 px-6 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Where Intelligent <span className="text-runix-cyan">Systems Evolve</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 leading-relaxed"
          >
            From adaptive runtimes to edge intelligence and robotics ecosystems, RUNIX explores the next generation of autonomous infrastructure.
          </motion.p>
        </div>
      </section>

      {/* SECTION 5 — CONTACT CTA */}
      <section className="w-full py-32 px-6 relative border-t border-white/5 bg-gradient-to-b from-[#050508] to-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-runix-cyan to-transparent opacity-30" />
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Build The Future With RUNIX</h2>
            <p className="text-xl text-slate-400">The future of adaptive intelligent systems is only beginning.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="px-8 py-4 rounded-full bg-runix-cyan text-slate-950 font-bold tracking-wide hover:bg-runix-cyan/90 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]">
              Contact Us
            </Link>
            <Link href="/about" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-wide hover:bg-white/10 transition-all">
              Join The Vision
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
