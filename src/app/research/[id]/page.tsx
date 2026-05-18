"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function getEmbedUrl(url: string): string {
  if (!url) return "";
  
  // Format Google Docs editor links (e.g., docs.google.com/document/d/.../edit)
  if (url.includes("docs.google.com/document")) {
    const matchDoc = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (matchDoc && matchDoc[1]) {
      return `https://docs.google.com/document/d/${matchDoc[1]}/preview`;
    }
  }

  // Format Google Drive links to correct direct embed preview
  if (url.includes("drive.google.com")) {
    let fileId = "";
    const matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else {
      const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (matchId && matchId[1]) {
        fileId = matchId[1];
      }
    }
    
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  
  // Fallback for standard docs/PDFs
  return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, "research_articles", unwrappedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [unwrappedParams.id]);

  const handleDownload = () => {
    if (!article || !article.docLink) return;
    window.open(article.docLink, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-slate-500">Loading document...</div>;
  }

  if (!article) {
    return <div className="w-full min-h-screen flex items-center justify-center text-slate-500">Document not found.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center pt-32 px-6 min-h-screen">
      <div className="max-w-3xl w-full mx-auto">
        <Link href="/research" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Logs
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest text-slate-500">{article.date}</span>
            <span className="text-slate-600">•</span>
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-white/5 border border-white/10 ${article.color}`}>
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {article.title}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
          className="w-full relative"
        >
          {/* Cinematic Document Frame */}
          <div className="glass-panel p-4 md:p-6 rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-runix-cyan/5 via-transparent to-transparent pointer-events-none" />
            
            {/* Header Telemetry bar */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-runix-cyan animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-runix-cyan uppercase">Secure Reader Protocol Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Document Viewer Frame with Spring Page-Sliding Entry */}
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-full aspect-[4/5] md:h-[750px] rounded-2xl overflow-hidden bg-[#0d0d13] border border-white/5 relative group"
            >
              <iframe
                src={getEmbedUrl(article.docLink)}
                className="w-full h-full border-none"
                title={article.title}
                allow="autoplay"
              />
            </motion.div>
          </div>

          <div className="p-8 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-runix-cyan/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-runix-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold">Download Copy</h4>
                <p className="text-sm text-slate-400">Offline document file</p>
              </div>
            </div>
             <button 
              onClick={handleDownload}
              disabled={!article.docLink}
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 text-white font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              Download Paper <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
