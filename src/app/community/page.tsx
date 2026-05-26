"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import {
  MessageSquare, MessageCircle, Users, TrendingUp,
  Plus, X, ThumbsUp, Clock, Sparkles, Activity, Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Posts" },
  { id: "ui", label: "UI" },
  { id: "kernel", label: "Kernel" },
  { id: "drivers", label: "Drivers" },
  { id: "testing", label: "Testing" },
  { id: "feedback", label: "Feedback" },
  { id: "features", label: "Features" },
];

const gradientMap: Record<string, string> = {
  kernel: "gradient-primary",
  drivers: "gradient-primary",
  ui: "gradient-blue-cyan",
  features: "gradient-blue-cyan",
  testing: "gradient-purple-indigo",
  feedback: "gradient-purple-indigo",
};

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  likes: number;
  likedBy: string[];
  commentCount: number;
  createdAt: string;
}

interface ActiveMember {
  name: string;
  online: boolean;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 2000;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

function timeAgo(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" });
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const [stats, setStats] = useState({ members: 0, posts: 0, comments: 0, onlineNow: 0 });
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [activeMembers, setActiveMembers] = useState<ActiveMember[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, statsRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/community/stats"),
        ]);

        const postsData = await postsRes.json();
        const statsData = await statsRes.json();

        const fetchedPosts = (postsData.posts || []).map((p: any) => ({
          ...p,
          likedBy: p.likedBy || [],
          commentCount: p.commentCount ?? p.comments ?? 0,
        }));

        setPosts(fetchedPosts);
        setStats(statsData.stats || { members: 0, posts: 0, comments: 0, onlineNow: 0 });
        setTrendingTopics(statsData.trending || []);
        setActiveMembers(statsData.activeMembers || []);
      } catch {
        // silently fail — state stays empty
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    const liked = new Set(
      posts.filter((p) => (p.likedBy || []).includes(uid)).map((p) => p.id)
    );
    setLikedPosts(liked);
  }, [posts, user]);

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !user) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          authorId: user.uid,
          authorName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        }),
      });

      const data = await res.json();
      if (data.success) {
        const created: Post = {
          id: data.id,
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          authorId: user.uid,
          authorName: user.displayName || user.email?.split("@")[0] || "Anonymous",
          likes: 0,
          likedBy: [],
          commentCount: 0,
          createdAt: new Date().toISOString(),
        };
        setPosts([created, ...posts]);
        setStats((s) => ({ ...s, posts: s.posts + 1 }));
      }
      setNewPost({ title: "", content: "", category: "general" });
      setShowNewPost(false);
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = useCallback(
    async (postId: string) => {
      if (!user) return;

      const wasLiked = likedPosts.has(postId);

      setLikedPosts((prev) => {
        const next = new Set(prev);
        if (wasLiked) next.delete(postId);
        else next.add(postId);
        return next;
      });

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, likes: wasLiked ? p.likes - 1 : p.likes + 1 }
            : p
        )
      );

      try {
        await fetch(`/api/posts/${postId}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid, liked: wasLiked }),
        });
      } catch {
        setLikedPosts((prev) => {
          const next = new Set(prev);
          if (wasLiked) next.add(postId);
          else next.delete(postId);
          return next;
        });
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, likes: wasLiked ? p.likes + 1 : p.likes - 1 }
              : p
          )
        );
      }
    },
    [user, likedPosts]
  );

  const getCategoryGradient = (cat: string) => gradientMap[cat] || "";
  const excerpt = (content: string, max = 120) =>
    content.length > max ? content.slice(0, max) + "..." : content;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-6 w-6 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
          <p className="text-sm text-[var(--text-muted)]">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] border border-[var(--primary)]/20 text-xs font-semibold text-[var(--primary)]">
                    <Sparkles className="w-3 h-3" />
                    Community
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                  Community <span className="text-gradient">Hub</span>
                </h1>
                <p className="text-[var(--text-secondary)] max-w-xl">
                  Discuss, share, and help shape the future of Runix.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.05} variant="scale">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { label: "Members", value: stats.members, icon: Users },
                { label: "Posts", value: stats.posts, icon: MessageSquare },
                { label: "Comments", value: stats.comments, icon: MessageCircle },
                { label: "Online Now", value: stats.onlineNow, icon: Activity },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 group"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "radial-gradient(500px circle at 50% 50%, var(--glow-primary), transparent 50%)",
                    }}
                  />
                  <div className="relative z-10 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)] mb-0.5">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums flex items-center gap-2">
                        <AnimatedCounter target={stat.value} />
                        {stat.label === "Online Now" && (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-40" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--success)]" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SectionReveal delay={0.05}>
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        activeCategory === cat.id
                          ? "text-white shadow-sm"
                          : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                      }`}
                    >
                      {activeCategory === cat.id && (
                        <motion.span
                          layoutId="activeCategoryBg"
                          className="absolute inset-0 rounded-lg bg-[var(--primary)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {cat.id !== "all" && <Hash className="w-3 h-3 opacity-70" />}
                        {cat.label}
                      </span>
                    </button>
                  ))}
                  <div className="ml-auto flex-shrink-0">
                    {user ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowNewPost(!showNewPost)}
                      >
                        <Plus className="w-4 h-4" />
                        New Post
                      </Button>
                    ) : (
                      <Link href="/login?redirect=/community">
                        <Button variant="primary" size="sm">
                          Log in to Post
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SectionReveal>

              <AnimatePresence>
                {showNewPost && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <Card className="p-6" hover={false}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                          Create a Post
                        </h3>
                        <button
                          onClick={() => setShowNewPost(false)}
                          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1.5 rounded-lg hover:bg-[var(--bg-secondary)]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <form onSubmit={handleCreatePost} className="space-y-4">
                        <Input
                          placeholder="Post title"
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          required
                        />
                        <Textarea
                          placeholder="Share your thoughts, ideas, or feedback..."
                          rows={4}
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          required
                        />
                        <div className="flex items-center justify-between">
                          <select
                            value={newPost.category}
                            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                            className="px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_var(--ring)] transition-all"
                          >
                            <option value="general">General</option>
                            <option value="ui">UI</option>
                            <option value="kernel">Kernel</option>
                            <option value="drivers">Drivers</option>
                            <option value="testing">Testing</option>
                            <option value="feedback">Feedback</option>
                            <option value="features">Features</option>
                          </select>
                          <Button type="submit" variant="primary" size="sm" loading={submitting}>
                            Publish Post
                          </Button>
                        </div>
                      </form>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <SectionReveal delay={i * 0.02} variant="none">
                        <motion.div
                          whileHover={{ scale: 1.005 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <Card className="p-5 group relative overflow-hidden cursor-default">
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                              style={{
                                background:
                                  "radial-gradient(450px circle at 50% 50%, var(--glow-primary), transparent 50%)",
                              }}
                            />
                            <div className="relative z-10">
                              <div className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                  <Avatar name={post.authorName} size="sm" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                    {post.category !== "general" ? (
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-full border border-[var(--border)] ${getCategoryGradient(post.category)}`}
                                      >
                                        {post.category}
                                      </span>
                                    ) : (
                                      <Badge variant="default">general</Badge>
                                    )}
                                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                      <Clock className="w-3 h-3" />
                                      {timeAgo(post.createdAt)}
                                    </span>
                                  </div>
                                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary)] transition-colors duration-300 leading-snug">
                                    {post.title}
                                  </h3>
                                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                                    {excerpt(post.content)}
                                  </p>
                                  <div className="flex items-center gap-4 mt-3">
                                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                                      {post.authorName}
                                    </span>
                                    <button
                                      onClick={() => handleLike(post.id)}
                                      disabled={!user}
                                      className="flex items-center gap-1 text-xs transition-all duration-200 group/btn disabled:opacity-50"
                                    >
                                      <ThumbsUp
                                        className={`w-3.5 h-3.5 transition-all duration-200 ${
                                          likedPosts.has(post.id)
                                            ? "text-[var(--primary)] fill-[var(--primary)]"
                                            : "text-[var(--text-muted)] group-hover/btn:text-[var(--primary)]"
                                        }`}
                                      />
                                      <span
                                        className={`transition-colors duration-200 ${
                                          likedPosts.has(post.id)
                                            ? "text-[var(--primary)] font-semibold"
                                            : "text-[var(--text-muted)] group-hover/btn:text-[var(--primary)]"
                                        }`}
                                      >
                                        {post.likes}
                                      </span>
                                    </button>
                                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                      <MessageCircle className="w-3.5 h-3.5" />
                                      {post.commentCount}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      </SectionReveal>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!loading && filteredPosts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <MessageSquare className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
                    <p className="text-[var(--text-muted)] font-medium">
                      No posts in this category yet.
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      Be the first to start a discussion!
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <SectionReveal delay={0.1}>
                <Card className="p-5 relative overflow-hidden" hover={false}>
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: "radial-gradient(400px circle at 50% 0%, var(--glow-primary), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
                      Trending
                    </h3>
                    <div className="space-y-1">
                      {trendingTopics.length > 0 ? (
                        trendingTopics.map((topic, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="block w-full text-left text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-2 px-2 rounded-lg hover:bg-[var(--primary-light)] border-b border-[var(--border)] last:border-0 group"
                          >
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[var(--bg-secondary)] text-[11px] font-semibold text-[var(--text-muted)] mr-2 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-200">
                              {i + 1}
                            </span>
                            {topic}
                          </motion.button>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--text-muted)] py-4 text-center">No trending topics yet</p>
                      )}
                    </div>
                  </div>
                </Card>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <Card className="p-5" hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--primary)]" />
                      Active Members
                    </h3>
                    <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {activeMembers.filter((m) => m.online).length} online
                    </span>
                  </div>
                  <div className="space-y-3">
                    {activeMembers.length > 0 ? (
                      activeMembers.map((member, i) => (
                        <motion.div
                          key={member.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                          className="flex items-center gap-2.5 group"
                        >
                          <div className="relative flex-shrink-0">
                            <Avatar name={member.name} size="sm" />
                            {member.online && (
                              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-30" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)] ring-2 ring-[var(--bg-card)]" />
                              </span>
                            )}
                            {!member.online && (
                              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--text-muted)] ring-2 ring-[var(--bg-card)]" />
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[var(--text-primary)] truncate font-medium leading-tight">
                              {member.name}
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">
                              {member.online ? "Online" : "Offline"}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-sm text-[var(--text-muted)] py-4 text-center">No members yet</p>
                    )}
                  </div>
                </Card>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <Card className="p-5 relative overflow-hidden" hover={false}>
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, var(--primary-light), transparent 60%)" }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[var(--primary)]" />
                      Community Stats
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Members", value: stats.members },
                        { label: "Posts", value: stats.posts },
                        { label: "Comments", value: stats.comments },
                        { label: "Online Now", value: stats.onlineNow },
                      ].map((stat) => (
                        <motion.div
                          key={stat.label}
                          whileHover={{ x: 3 }}
                          className="flex items-center justify-between text-sm py-2 border-b border-[var(--border)] last:border-0"
                        >
                          <span className="text-[var(--text-muted)]">{stat.label}</span>
                          <span className="font-semibold text-[var(--text-primary)] tabular-nums">
                            {stat.value.toLocaleString()}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
