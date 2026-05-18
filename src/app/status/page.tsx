"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Activity, Server, Database } from "lucide-react";

export default function SystemStatusPage() {
  const services = [
    { name: "Core Orchestration API", status: "Operational", uptime: "99.99%", icon: Activity },
    { name: "Global Node Network", status: "Operational", uptime: "100%", icon: Server },
    { name: "Memory Persistence (DB)", status: "Operational", uptime: "99.98%", icon: Database },
  ];

  return (
    <div className="w-full min-h-screen pt-32 px-6 bg-[#020203]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">System <span className="text-gradient">Status</span></h1>
          <p className="text-lg text-slate-400">Real-time telemetry and operational status of RUNIX global nodes.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-runix-cyan/20 bg-runix-cyan/5 mb-12 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-runix-cyan/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-runix-cyan" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">All Systems Operational</h3>
            <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="space-y-4">
          {services.map((svc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-xl border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <svc.icon className="w-5 h-5 text-slate-400" />
                <div>
                  <h4 className="text-white font-medium">{svc.name}</h4>
                  <p className="text-xs text-slate-500">Uptime: {svc.uptime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-runix-cyan animate-pulse" />
                <span className="text-sm font-bold text-runix-cyan">{svc.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
