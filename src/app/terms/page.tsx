"use client";

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen pt-32 px-6 pb-24 bg-[#020203]">
      <div className="max-w-3xl mx-auto prose prose-invert prose-slate prose-p:leading-relaxed prose-headings:text-white">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Terms of Service</h1>
        
        <div className="glass-panel p-8 rounded-2xl border border-white/5 mb-8 text-sm text-slate-400">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        
        <h3 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Protocols</h3>
        <p className="text-slate-300">
          By deploying RUNIX nodes or accessing the Master Control Terminal, you agree to abide by the execution protocols outlined in this manifesto. Any deviation from authorized deployment practices may result in node isolation.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">2. Autonomous Liability</h3>
        <p className="text-slate-300">
          You are solely responsible for the physical and digital actions taken by AI Employees deployed under your namespace. RUNIX Systems provides the orchestration layer but does not guarantee the logic safety of user-defined intent vectors. Always implement hardware kill switches when operating robotics.
        </p>
      </div>
    </div>
  );
}
