"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TerminalPortalPage() {
  const [access, setAccess] = useState("");

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 bg-[#020203]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-runix-cyan/50" />
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-runix-cyan/10 flex items-center justify-center border border-runix-cyan/20">
            <Terminal className="w-8 h-8 text-runix-cyan" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Node Authentication</h1>
        <p className="text-sm text-slate-400 text-center mb-8">Enter your cryptographic clearance key to access the master terminal.</p>
        
        <div className="space-y-4">
          <input 
            type="password" 
            placeholder="AWAITING KEY..."
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-4 text-center font-mono text-runix-cyan focus:outline-none focus:border-runix-cyan/50 tracking-widest"
          />
          <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all text-sm tracking-widest uppercase">
            Initiate Handshake
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors">
            Return to Public Grid
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
