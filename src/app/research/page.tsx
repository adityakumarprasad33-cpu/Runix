"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ResearchPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "research_articles"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by timestamp if needed, for now just set
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-24 px-6 min-h-[90vh]">
      <section className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Internal <span className="text-gradient">Logs</span></h1>
        <p className="text-lg text-slate-400">Research papers, infrastructure updates, and engineering documentation.</p>
      </section>

      <section className="w-full max-w-4xl mx-auto space-y-8 mb-32 relative z-10">
        {loading ? (
          <div className="text-center text-slate-500 py-12">Initializing database connection...</div>
        ) : (
          articles.map((article, i) => (
            <Link href={`/research/${article.id}`} key={article.id} className="block">
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block p-8 rounded-3xl glass-panel border border-white/5 hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-white/10 transition-colors pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-widest text-slate-500">{article.date}</span>
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 ${article.color}`}>
                  {article.category}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-runix-cyan transition-colors">
              {article.title}
            </h2>
            <p className="text-slate-400 leading-relaxed line-clamp-2">
              Click to open the interactive document viewer for this research log.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
              Read Documentation <span className="text-runix-cyan transition-transform group-hover:translate-x-1">→</span>
            </div>
            </motion.article>
          </Link>
          ))
        )}
      </section>
    </div>
  );
}
