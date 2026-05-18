"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, TerminalSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      nodeId: formData.get("nodeId"),
      signalVector: formData.get("signalVector"),
      transmissionData: formData.get("transmissionData"),
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <div className="w-full flex flex-col items-center pt-24 px-6 min-h-[90vh] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-runix-cyan/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <section className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Initialize <span className="text-gradient">Connection</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-slate-400 font-medium"
        >
          Establish a direct data link with the RUNIX engineering core.
        </motion.p>
      </section>

      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="space-y-8 h-full"
        >
          <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden h-full flex flex-col justify-between group hover:border-runix-cyan/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110 transform">
              <TerminalSquare className="w-32 h-32 text-runix-cyan" />
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">System Access Protocol</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-runix-cyan/10 flex items-center justify-center shrink-0 border border-runix-cyan/20 group-hover/item:bg-runix-cyan/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-runix-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-semibold tracking-wide">Encrypted Comms</h4>
                    <p className="text-slate-400 text-sm mt-1">core@runix.systems</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group/item">
                  <div className="w-14 h-14 rounded-2xl bg-runix-purple/10 flex items-center justify-center shrink-0 border border-runix-purple/20 group-hover/item:bg-runix-purple/20 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-runix-purple" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-semibold tracking-wide">Physical Node</h4>
                    <p className="text-slate-400 text-sm mt-1">Distributed Operations Cluster</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
              <h4 className="text-runix-cyan text-xs font-bold mb-6 uppercase tracking-[0.2em]">Network Links</h4>
              <div className="flex gap-6">
                {['GitHub Matrix', 'Twitter Feed', 'LinkedIn Connect'].map((link) => (
                  <a key={link} href="#" className="text-sm font-semibold text-slate-300 hover:text-white relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-runix-cyan hover:after:w-full transition-all duration-300 after:transition-all after:duration-300">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="glass-panel p-10 rounded-3xl border border-white/5 relative neon-border group h-full"
        >
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-runix-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-runix-cyan"></span>
            </span>
          </div>

          <form className="space-y-6 relative z-10 flex flex-col h-full justify-between" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-runix-cyan flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-runix-cyan inline-block" /> Node ID (Name)
                </label>
                <input 
                  type="text"
                  name="nodeId" 
                  required
                  className="w-full bg-[#030305]/80 border border-white/10 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-runix-cyan/50 focus:bg-[#050508] transition-all shadow-inner placeholder:text-slate-600"
                  placeholder="Enter identifier..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-runix-purple flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-runix-purple inline-block" /> Signal Vector (Email)
                </label>
                <input 
                  type="email" 
                  name="signalVector"
                  required
                  className="w-full bg-[#030305]/80 border border-white/10 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-runix-purple/50 focus:bg-[#050508] transition-all shadow-inner placeholder:text-slate-600"
                  placeholder="Secure channel address..."
                />
              </div>
              <div className="space-y-2 flex-grow flex flex-col">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" /> Transmission Data
                </label>
                <textarea 
                  rows={5}
                  name="transmissionData"
                  required
                  className="w-full flex-grow bg-[#030305]/80 border border-white/10 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-white/50 focus:bg-[#050508] transition-all resize-none shadow-inner placeholder:text-slate-600"
                  placeholder="Input logic or inquiry here..."
                ></textarea>
              </div>
            </div>

            <div className="pt-6 relative">
               <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-xl bg-runix-cyan text-slate-950 font-bold text-lg hover:bg-runix-cyan/90 transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-70 disabled:cursor-not-allowed group/btn overflow-hidden relative"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Transmit Payload <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              <div className="absolute top-full left-0 right-0 mt-4 text-center h-6">
                {status === "success" && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-5 h-5" /> Transmission successful.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-400 font-medium">
                    <AlertCircle className="w-5 h-5" /> Transmission failed. Retry.
                  </motion.div>
                )}
              </div>
            </div>

          </form>
        </motion.div>
      </section>
    </div>
  );
}
