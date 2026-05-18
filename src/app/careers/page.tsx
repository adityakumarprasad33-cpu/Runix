"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Wrench } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const roles = [
    {
      title: "AI Systems Engineer",
      dept: "Core Orchestration",
      type: "Remote / Global Node",
      icon: Code2,
      desc: "Architect the Core Orchestration Platform. Build the reasoning loops, task routing protocols, and the asynchronous event systems that power our AI employees."
    },
    {
      title: "Robotics Hardware Specialist",
      dept: "Physical Integration Layer",
      type: "On-Site Physical Labs",
      icon: Wrench,
      desc: "Bridge the gap between digital intent and physical actuation. Work with ROS, microcontrollers, and localized sensor networks to bring RUNIX to life."
    },
    {
      title: "Edge Inference Researcher",
      dept: "Adaptive Runtime",
      type: "Remote / Global Node",
      icon: Cpu,
      desc: "Optimize and quantize open-source models (Llama, Mistral) to run seamlessly on low-power edge devices with minimal latency."
    }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 px-6 min-h-screen">
      <section className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Build the <span className="text-gradient">Ecosystem</span></h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          We are assembling a team of systems thinkers. We don't want prompt engineers. We want builders who understand memory management, hardware layers, and true autonomous architecture.
        </p>
      </section>

      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="glass-panel p-10 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-bold text-white mb-6">Our Engineering Culture</h2>
          <ul className="space-y-6">
            {[
              { title: "No Hype, Just Systems", desc: "We focus on real engineering over AI hype. You will build actual infrastructure." },
              { title: "Deep Technical Fundamentals", desc: "We care about memory efficiency, asynchronous execution, and bare-metal performance." },
              { title: "Autonomy First", desc: "We build systems that run themselves. We expect our engineers to do the same." }
            ].map((v, i) => (
              <li key={i} className="flex flex-col">
                <span className="text-runix-cyan font-bold mb-1">{v.title}</span>
                <span className="text-slate-400 text-sm leading-relaxed">{v.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Open Node Positions</h2>
          {roles.map((role, i) => (
            <Link href="/contact" key={i} className="mb-6 block">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-runix-purple/30 transition-all cursor-pointer group"
              >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-runix-purple/10 flex items-center justify-center shrink-0">
                    <role.icon className="w-5 h-5 text-runix-purple group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{role.title}</h3>
                    <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">
                      {role.dept} • {role.type}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {role.desc}
              </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
