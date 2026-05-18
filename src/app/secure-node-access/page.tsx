"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { Loader2, Trash2, PlusCircle, Database, Lock, LogOut } from "lucide-react";

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchArticles();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "RESEARCH",
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(),
    color: "text-runix-cyan",
    docLink: ""
  });

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "research_articles"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "research_articles"), {
        ...formData,
        timestamp: new Date()
      });
      setFormData({ ...formData, title: "", docLink: "" });
      await fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteDoc(doc(db, "research_articles", id));
      await fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  if (authLoading) {
    return <div className="w-full min-h-screen flex items-center justify-center bg-[#020203] text-slate-500">Authenticating...</div>;
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-6 bg-[#020203]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-runix-cyan/10 flex items-center justify-center border border-runix-cyan/20">
              <Lock className="w-8 h-8 text-runix-cyan" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Restricted Access</h1>
          <p className="text-sm text-slate-400 text-center mb-8">Authorized personnel only.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-runix-cyan/50"
            />
            <input 
              type="password" required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-runix-cyan/50"
            />
            {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
            <button type="submit" className="w-full py-4 rounded-xl bg-runix-cyan text-slate-950 font-bold transition-all text-sm tracking-widest uppercase hover:bg-runix-cyan/90">
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-32 px-6 pb-24 bg-[#020203]">
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">System <span className="text-gradient">Control</span></h1>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium">
          <LogOut className="w-4 h-4" /> Disconnect
        </button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Publish Form */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-runix-cyan/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-runix-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white">Publish Research</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Title</label>
              <input 
                type="text" required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-runix-cyan/50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-runix-cyan/50"
                >
                  <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
                  <option value="ROBOTICS">ROBOTICS</option>
                  <option value="AI RESEARCH">AI RESEARCH</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Accent Color</label>
                <select 
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-runix-cyan/50"
                >
                  <option value="text-runix-cyan">Cyan</option>
                  <option value="text-runix-purple">Purple</option>
                  <option value="text-orange-400">Orange</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Document Link (PDF/Doc URL)</label>
              <input 
                type="url" required
                value={formData.docLink}
                onChange={e => setFormData({...formData, docLink: e.target.value})}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-runix-cyan/50 font-mono text-sm"
                placeholder="https://example.com/document.pdf"
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 rounded-xl bg-runix-cyan text-slate-950 font-bold hover:bg-runix-cyan/90 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><PlusCircle className="w-5 h-5" /> Push to Production</>}
            </button>
          </form>
        </div>

        {/* Existing Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-8">Active Database Records</h2>
          
          <div className="space-y-4">
            {articles.length === 0 && <p className="text-slate-500">No articles found in DB.</p>}
            
            {articles.map((article) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${article.color}`}>{article.category}</span>
                    <span className="text-[10px] text-slate-500">• {article.date}</span>
                  </div>
                  <h4 className="text-white font-bold">{article.title}</h4>
                </div>
                <button 
                  onClick={() => handleDelete(article.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
