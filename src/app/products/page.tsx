"use client";

import { motion } from "framer-motion";
import { Terminal, Bot, Radio, Cpu, Network } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const modules = [
    {
      title: "RUNIX CORE V1",
      status: "UPCOMING",
      icon: Terminal,
      desc: "The lightweight local execution engine that handles basic intent routing, file operations, and system automation."
    },
    {
      title: "AI Employees",
      status: "In Development",
      icon: Bot,
      desc: "Specialized cognitive agents capable of understanding complex workflows, coding, reasoning, and autonomous execution."
    },
    {
      title: "Adaptive Edge Node",
      status: "Conceptual",
      icon: Radio,
      desc: "Hardware-agnostic deployment layer allowing RUNIX intelligence to run on localized hardware without cloud dependency."
    },
    {
      title: "Robotics Interface Protocol",
      status: "Conceptual",
      icon: Cpu,
      desc: "A standardized communication API for sensors, actuators, and motor controllers to directly receive instructions from the Core Orchestration Platform."
    },
    {
      title: "Autonomous Infrastructure",
      status: "Vision",
      icon: Network,
      desc: "A fully decentralized swarm of RUNIX nodes sharing memory, distributing computing tasks, and managing physical facilities."
    }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 px-6 min-h-screen">
      <section className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Future <span className="text-gradient">Modules</span></h1>
        <p className="text-lg text-slate-400">Conceptual showcases of the expanding RUNIX ecosystem.</p>
      </section>

      <section className="max-w-5xl w-full mx-auto space-y-8 mb-32">
        {modules.map((mod, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden group hover:border-runix-cyan/30 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-runix-cyan/50 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
            
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-runix-cyan/10 transition-colors">
              <mod.icon className="w-8 h-8 text-slate-300 group-hover:text-runix-cyan transition-colors" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-white">{mod.title}</h3>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/10 text-slate-300 border border-white/5">
                  {mod.status}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-2xl">{mod.desc}</p>
            </div>
            
            <div className="hidden md:block">
              <Link href={`/products/${i + 1}`}>
                <button className="px-6 py-2 rounded-full border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                  View Specs
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
