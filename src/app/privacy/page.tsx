"use client";

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen pt-32 px-6 pb-24 bg-[#020203]">
      <div className="max-w-3xl mx-auto prose prose-invert prose-slate prose-p:leading-relaxed prose-headings:text-white">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Privacy Protocols</h1>
        
        <div className="glass-panel p-8 rounded-2xl border border-white/5 mb-8 text-sm text-slate-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        
        <h3 className="text-2xl font-bold mt-8 mb-4">1. Data Telemetry & Encryption</h3>
        <p className="text-slate-300">
          RUNIX operates on a zero-trust, edge-first architecture. We do not aggregate your local node data in centralized cloud repositories. All memory persistence and execution states are stored locally on your deployed hardware and encrypted using AES-256 military-grade standards.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">2. Autonomous Agent Memory</h3>
        <p className="text-slate-300">
          Any context or "memory" gathered by RUNIX AI employees is isolated to the specific namespace of that agent. We do not use your proprietary workflows to train our base global models. Your logic belongs entirely to your nodes.
        </p>
      </div>
    </div>
  );
}
