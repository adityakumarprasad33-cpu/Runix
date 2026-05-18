"use client";

import { motion } from "framer-motion";
import { Cpu, Network, Box, Database, Zap, MonitorSmartphone } from "lucide-react";

export default function EcosystemPage() {
  const nodes = [
    {
      title: "Master Orchestrator",
      desc: "The central intelligence layer. It routes tasks, breaks down complex problems, and assigns workflows to specialized modules.",
      icon: Network,
      color: "text-runix-cyan",
      bg: "bg-runix-cyan/10",
      border: "border-runix-cyan/20"
    },
    {
      title: "AI Employees",
      desc: "Specialized cognitive nodes: Coding Experts, Research Analysts, Hardware Interfaces, and Reasoning Planners.",
      icon: Box,
      color: "text-runix-purple",
      bg: "bg-runix-purple/10",
      border: "border-runix-purple/20"
    },
    {
      title: "Adaptive Runtime",
      desc: "The cross-platform infrastructure running the agents, adapting to Windows, Linux, iOS, or bare-metal edge environments.",
      icon: MonitorSmartphone,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      title: "Memory System",
      desc: "Persistent task history, vector embeddings, and operational logs that construct a continuous intelligence loop.",
      icon: Database,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20"
    },
    {
      title: "Edge Intelligence",
      desc: "Local, low-latency, offline inference systems designed to run specialized models on embedded endpoints.",
      icon: Cpu,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20"
    },
    {
      title: "Robotics Layer",
      desc: "The physical bridge. Communication logic for sensors, actuators, Jetson arrays, and mechanical systems.",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-32 px-6 min-h-screen relative overflow-hidden bg-[#020203]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-runix-cyan/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <section className="max-w-4xl mx-auto text-center mb-32 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
        >
          The <span className="text-gradient">Ecosystem</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto"
        >
          A unified, modular intelligence network designed to scale from edge hardware to centralized orchestration.
        </motion.p>
      </section>

      {/* Advanced Interconnected Graph Layout */}
      <section className="w-full max-w-7xl mx-auto mb-40 relative z-10">
        
        {/* Background Connection Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite] hidden lg:block pointer-events-none">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-runix-cyan rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#06b6d4]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-white/[0.02] animate-[spin_90s_linear_infinite_reverse] hidden lg:block pointer-events-none">
           <div className="absolute top-1/2 left-0 w-2 h-2 bg-runix-purple rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#8b5cf6]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {nodes.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group cursor-pointer bg-[#050508]/60 backdrop-blur-xl shadow-2xl transition-all duration-500`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${node.bg} rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 opacity-50`} />
              
              <div className="flex flex-col gap-6 relative z-10 h-full">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl ${node.bg} flex items-center justify-center border ${node.border} shadow-inner`}>
                    <node.icon className={`w-7 h-7 ${node.color}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${node.color} px-3 py-1 rounded-full border ${node.border} bg-[#050508]`}>
                    Node {i+1}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{node.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
              
              {/* Glowing Connection Line effect on hover */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-full transition-all duration-700 opacity-80" style={{ color: "var(--color-runix-cyan)" }} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
