"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Shield, Zap, Terminal } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const productsData: Record<string, any> = {
  "1": {
    title: "RUNIX CORE V1",
    status: "UPCOMING",
    desc: "The lightweight local execution engine that handles basic intent routing, file operations, and system automation.",
    features: [
      "Zero-latency local execution",
      "Asynchronous task routing",
      "Direct filesystem manipulation",
      "Lightweight memory footprint (< 100MB)"
    ]
  },
  "2": {
    title: "AI Employees",
    status: "In Development",
    desc: "Specialized cognitive agents capable of understanding complex workflows, coding, reasoning, and autonomous execution.",
    features: [
      "Context-aware workflow routing",
      "Persistent memory and learning",
      "Multi-agent collaborative environments",
      "Autonomous problem solving"
    ]
  },
  "3": {
    title: "Adaptive Edge Node",
    status: "Conceptual",
    desc: "Hardware-agnostic deployment layer allowing RUNIX intelligence to run on localized hardware without cloud dependency.",
    features: [
      "Hardware-agnostic compatibility",
      "Offline inference capabilities",
      "Encrypted edge data storage",
      "Peer-to-peer node meshing"
    ]
  },
  "4": {
    title: "Robotics Interface Protocol",
    status: "Conceptual",
    desc: "A standardized communication API for sensors, actuators, and motor controllers to directly receive instructions from the Core Orchestration Platform.",
    features: [
      "Real-time sensor translation",
      "Low-level motor control APIs",
      "Safety and override protocols",
      "Standardized intent vectors"
    ]
  },
  "5": {
    title: "Autonomous Infrastructure",
    status: "Vision",
    desc: "A fully decentralized swarm of RUNIX nodes sharing memory, distributing computing tasks, and managing physical facilities.",
    features: [
      "Swarm intelligence distribution",
      "Self-healing network architecture",
      "Facility-wide resource management",
      "Predictive maintenance systems"
    ]
  }
};

export default function ProductSpecsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const product = productsData[unwrappedParams.id] || productsData["1"];

  return (
    <div className="w-full flex flex-col items-center pt-32 px-6 min-h-screen">
      <div className="max-w-4xl w-full mx-auto">
        <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Modules
        </Link>
        
        <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-runix-cyan/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
              <Terminal className="w-10 h-10 text-runix-cyan" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-white tracking-tight">{product.title}</h1>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-runix-cyan/10 text-runix-cyan border border-runix-cyan/30">
                  {product.status}
                </span>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                {product.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Cpu className="w-5 h-5 text-slate-300" />
                  <span className="text-sm font-medium text-white">Execution Architecture</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Shield className="w-5 h-5 text-slate-300" />
                  <span className="text-sm font-medium text-white">Military-Grade Security</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Zap className="w-5 h-5 text-slate-300" />
                  <span className="text-sm font-medium text-white">Low Latency Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.features.map((feature: string, i: number) => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 glass-panel flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-runix-cyan/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-runix-cyan text-sm font-bold">{i + 1}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
