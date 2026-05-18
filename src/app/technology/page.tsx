"use client";

import { motion } from "framer-motion";

export default function TechnologyPage() {
  return (
    <div className="w-full flex flex-col items-center pt-24 px-6 min-h-screen">
      <section className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Deep <span className="text-gradient">Technology</span></h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Built on a modular, asynchronous execution core. The RUNIX architecture connects complex cognitive routing directly to bare-metal hardware.
        </p>
      </section>

      {/* Abstract Architecture Diagram */}
      <section className="w-full max-w-5xl mx-auto mb-32 h-[500px] relative glass-panel rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050508]/80 z-0" />
        
        {/* Animated flow lines */}
        <div className="absolute top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-runix-cyan to-transparent opacity-20" />
        <div className="absolute top-3/4 w-full h-[1px] bg-gradient-to-r from-transparent via-runix-purple to-transparent opacity-20" />

        <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 w-full px-12">
          
          {/* Layer 1: Input / Adaptation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="w-full md:w-2/3 py-4 border border-runix-cyan/30 rounded-xl bg-runix-cyan/5 text-center backdrop-blur-md relative"
          >
            <span className="text-runix-cyan text-sm font-bold tracking-widest uppercase">Adaptive Interface Layer</span>
            <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-runix-cyan/30" />
          </motion.div>

          {/* Layer 2: Orchestration */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="w-full py-6 border border-white/20 rounded-xl bg-white/5 text-center backdrop-blur-md relative"
          >
            <span className="text-white font-bold tracking-widest uppercase">Core Orchestration Platform</span>
            <div className="absolute -bottom-10 left-1/4 w-[1px] h-10 bg-white/20" />
            <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-white/20" />
            <div className="absolute -bottom-10 right-1/4 w-[1px] h-10 bg-white/20" />
          </motion.div>

          {/* Layer 3: Modules */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="w-full flex justify-between gap-4 relative"
          >
            <div className="flex-1 py-4 border border-runix-purple/30 rounded-xl bg-runix-purple/5 text-center text-xs text-runix-purple tracking-wider">AI EMPLOYEES</div>
            <div className="flex-1 py-4 border border-blue-400/30 rounded-xl bg-blue-400/5 text-center text-xs text-blue-400 tracking-wider">EXECUTION LAYER</div>
            <div className="flex-1 py-4 border border-emerald-400/30 rounded-xl bg-emerald-400/5 text-center text-xs text-emerald-400 tracking-wider">MEMORY SYS</div>
            <div className="absolute -bottom-10 left-1/2 w-[1px] h-10 bg-runix-cyan/30" />
          </motion.div>

          {/* Layer 4: Hardware */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}
            className="w-full md:w-2/3 py-4 border border-orange-400/30 rounded-xl bg-orange-400/5 text-center backdrop-blur-md"
          >
            <span className="text-orange-400 text-sm font-bold tracking-widest uppercase">Hardware & Robotics Edge</span>
          </motion.div>
          
        </div>
      </section>

      {/* Topics Grid */}
      <section className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Engineering the Future</h2>
          <p className="text-slate-400 leading-relaxed">
            Our technology stack is built on Python and systems languages, utilizing lightweight local inference models, asynchronous event loops, and deep hardware APIs. 
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-runix-cyan mt-1">⎔</span>
              <div>
                <strong className="text-white block">Local Inference (Edge AI)</strong>
                <span className="text-sm text-slate-400">Optimized tensor execution for running small, task-specific models directly on physical devices.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-runix-purple mt-1">⎔</span>
              <div>
                <strong className="text-white block">Robotics Middleware</strong>
                <span className="text-sm text-slate-400">A high-speed communication bridge that converts complex AI intent into immediate hardware actuation.</span>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-runix-blue/10 via-transparent to-transparent opacity-50 group-hover:scale-110 transition-transform duration-700" />
          <pre className="text-xs text-runix-cyan font-mono overflow-hidden">
            <code>
{`[SYSTEM] Initializing Core Orchestration Platform
[NETWORK] Connecting to Edge Node 0x9A
[RUNTIME] Hardware Detected: Jetson Nano
[RUNTIME] Sensors: Active (LIDAR, CAM_01)
[AI_CORE] Loading Quantized Intent Model...
[AI_CORE] Model Loaded. Memory: 1.2GB
[ROUTING] Awaiting Input Stream...

>> user_intent_detected: "Map environment"
>> routing_task: Spatial Analysis Module
>> activating_actuators: 100%
`}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
}
