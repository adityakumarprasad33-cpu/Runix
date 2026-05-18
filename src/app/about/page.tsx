"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, Activity, Focus } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-runix-blue/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Not a Chatbot. <br />
          <span className="text-gradient">An Execution Ecosystem.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 leading-relaxed"
        >
          RUNIX is an advanced AI infrastructure company focused on building intelligent adaptive ecosystems. We are engineering the nervous system that connects AI employees, runtime systems, edge networks, and robotics.
        </motion.p>
      </section>

      {/* Vision Cards */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-runix-cyan/10 rounded-full blur-[50px] group-hover:bg-runix-cyan/20 transition-colors" />
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Our Philosophy</h3>
          <p className="text-slate-400 leading-relaxed relative z-10">
            We believe intelligence shouldn't be trapped behind a text box. True intelligence is adaptive, modular, and executes autonomously. It routes tasks intelligently, leverages hardware contexts dynamically, and transforms complex workflows into seamless executions.
          </p>
        </div>
        <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-runix-purple/10 rounded-full blur-[50px] group-hover:bg-runix-purple/20 transition-colors" />
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">The Future Vision</h3>
          <p className="text-slate-400 leading-relaxed relative z-10">
            A world where digital reasoning flows directly into physical action. By combining cross-platform runtime architecture with deep robotics integration, RUNIX aims to orchestrate the next generation of physical and digital autonomy.
          </p>
        </div>
      </section>

      {/* Vision Showcase Section */}
      <section className="w-full max-w-6xl mx-auto mb-32 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Vision of the <span className="text-runix-purple">Future</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The endgame is an autonomous, decentralized intelligence swarm. A seamless merge of digital thought and physical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Autonomous Robotics Swarms",
              desc: "A singular distributed RUNIX mind operating hundreds of physical robotic nodes synchronously to accomplish complex physical construction and analysis tasks.",
              color: "runix-cyan"
            },
            {
              title: "Planetary Edge Networks",
              desc: "Zero-latency decision making. Moving computation away from the cloud and directly onto the devices interacting with the environment.",
              color: "runix-purple"
            },
            {
              title: "Sentient Infrastructure",
              desc: "Buildings, servers, and factories that monitor, repair, and optimize themselves utilizing local embedded RUNIX employees.",
              color: "blue-500"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-500"
            >
              <div className={`absolute -top-20 -right-20 w-48 h-48 bg-${item.color}/10 rounded-full blur-[40px] group-hover:bg-${item.color}/20 transition-colors duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className={`w-12 h-2 rounded bg-${item.color}/50`} />
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
