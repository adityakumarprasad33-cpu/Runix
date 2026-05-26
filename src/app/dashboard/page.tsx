"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Cpu, HardDrive, Shield, Activity, Terminal, Download,
  Bell, Search, Settings, LogOut, Menu, ChevronLeft, ChevronRight,
  Users, MessageSquare, BarChart3, Globe, Package, Wifi,
  FolderKanban, GitBranch, GitPullRequest, Bug, BookOpen,
  Zap, Clock, Server, Cloud, Database, Layers, Map,
  Hexagon, Box, Code2, TerminalSquare, Fingerprint,
  Globe2, Monitor, Smartphone, Cpu as CpuIcon,
  ArrowUp, ArrowDown, ExternalLink, Plus,
  CheckCircle2, AlertCircle, XCircle, AlertTriangle,
  ChevronDown, Gauge, Workflow, Radio,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

/* ─── CONSTANTS ─── */
const sidebarNav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "kernel", label: "Kernel", icon: Cpu },
  { id: "builds", label: "Build Pipeline", icon: GitBranch },
  { id: "community", label: "Community", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "infrastructure", label: "Infrastructure", icon: Server },
];

const sidebarBottom = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Logout", icon: LogOut },
];

const categories = ["Kernel", "Drivers", "UI", "Testing", "Security", "Network"];

const metricsData = {
  cpu: { label: "CPU Optimization", value: 94, status: "optimal" as const, sub: "6.2 GHz — 8C/16T" },
  mem: { label: "Memory Management", value: 87, status: "good" as const, sub: "4.2 / 8 GB — 52%" },
  kernel: { label: "Kernel Modules", value: 23, status: "active" as const, sub: "23 loaded, 0 failed" },
  drivers: { label: "Driver Status", value: 98, status: "optimal" as const, sub: "47/48 operational" },
  fs: { label: "File System", value: 100, status: "optimal" as const, sub: "ext4 — journaling active" },
  security: { label: "Security Shield", value: 100, status: "optimal" as const, sub: "SELinux enforcing" },
  network: { label: "Network Layer", value: 96, status: "good" as const, sub: "10 Gbps — eth0" },
  runtime: { label: "Runtime Engine", value: 91, status: "good" as const, sub: "v1.0.0 — 14d uptime" },
};

/* ─── UTILITY ─── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
}

function LiveDot({ color }: { color: "emerald" | "amber" | "red" | "blue" | "gray" }) {
  const colorMap = { emerald: "bg-emerald-500", amber: "bg-amber-500", red: "bg-red-500", blue: "bg-blue-500", gray: "bg-gray-500" };
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorMap[color]} opacity-60`} />
      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colorMap[color]}`} />
    </span>
  );
}

function ProgressBar({ value, color = "rgb(129,140,248)" }: { value: number; color?: string }) {
  return (
    <div className="dashboard-progress">
      <motion.div
        className="dashboard-progress-bar"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
      />
    </div>
  );
}

/* ─── SIDEBAR ─── */
function Sidebar({ activeSection, setActiveSection, collapsed, setCollapsed }: {
  activeSection: string; setActiveSection: (s: string) => void;
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  const { logout } = useAuth();
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`dashboard-sidebar flex-shrink-0 flex flex-col h-screen sticky top-0 z-40 transition-all duration-300 ${collapsed ? "w-[60px]" : "w-[220px]"}`}
    >
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[rgba(26,26,46,0.8)] flex-shrink-0">
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold tracking-tight" style={{ color: "#e8edf5" }}>
            <span style={{ color: "#818cf8" }}>R</span>unix
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-[rgba(129,140,248,0.06)] transition-colors"
          style={{ color: "#5c5f7a" }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {sidebarNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`dashboard-sidebar-item w-full ${activeSection === item.id ? "active" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
        <div className="my-3 mx-3 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.1), transparent)" }} />
        <button className="dashboard-sidebar-item w-full" title="Notifications">
          <Bell className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Notifications</span>}
          <span className="ml-auto w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "rgba(248,113,113,0.2)", color: "#f87171" }}>3</span>
        </button>
        {sidebarBottom.map((item) => (
          item.id === "logout" ? (
            <button
              key={item.id}
              onClick={() => logout()}
              className="dashboard-sidebar-item w-full"
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ) : (
            <button key={item.id} className="dashboard-sidebar-item w-full" title={collapsed ? item.label : undefined}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        ))}
      </nav>

      <div className="p-3 border-t border-[rgba(26,26,46,0.8)]">
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 py-1.5">
            <LiveDot color="emerald" />
            <span className="text-[11px]" style={{ color: "#5c5f7a" }}>All systems operational</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

/* ─── SECTION 1: HERO CONTROL PANEL ─── */
function HeroPanel({ userName }: { userName: string }) {
  const timeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="dashboard-glow-edge rounded-xl p-6 mb-6"
      style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.08), rgba(6,182,212,0.03))" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(129,140,248,0.1)", color: "#818cf8" }}>
              <LiveDot color="blue" />
              Runix OS v1.0.0-boot
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(52,211,153,0.1)", color: "#34d399" }}>
              <CheckCircle2 className="w-3 h-3" />
              Build stable
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold mb-1" style={{ color: "#e8edf5" }}>
            {timeGreeting()}, {userName}
          </h1>
          <p className="text-sm" style={{ color: "#8b8fa3" }}>
            Kernel 6.8.0-runix — System ready. {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Kernel", value: "6.8.0", sub: "LTS", color: "#818cf8" },
            { label: "Uptime", value: "14d 6h", sub: "99.97%", color: "#34d399" },
            { label: "Nodes", value: "8", sub: "Active", color: "#22d3ee" },
            { label: "Runtime", value: "1.0.0", sub: "Production", color: "#fbbf24" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              className="rounded-lg p-3 text-center"
              style={{ background: "rgba(14,14,21,0.6)", border: "1px solid rgba(26,26,46,0.8)" }}
            >
              <p className="text-[11px] font-medium mb-1" style={{ color: "#5c5f7a" }}>{stat.label}</p>
              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px]" style={{ color: "#5c5f7a" }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── SECTION 2: SYSTEM STATUS GRID ─── */
function SystemStatusGrid() {
  const entries = Object.entries(metricsData);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <Gauge className="w-4 h-4" style={{ color: "#818cf8" }} />
          System Status
        </h2>
        <span className="text-[11px]" style={{ color: "#5c5f7a" }}>Last updated: 12s ago</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {entries.map(([key, metric], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="dashboard-metric p-4 group cursor-default"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: "#5c5f7a" }}>{metric.label}</span>
              <span className={`dashboard-badge ${metric.status === "optimal" ? "dashboard-badge-success" : metric.status === "good" ? "dashboard-badge-info" : "dashboard-badge-warning"}`}>
                {metric.status}
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-1.5">
              <span className="text-lg font-bold" style={{ color: "#e8edf5" }}>
                {typeof metric.value === "number" ? `${metric.value}%` : metric.value}
              </span>
            </div>
            <ProgressBar value={metric.value} color={metric.status === "optimal" ? "#34d399" : "#818cf8"} />
            <p className="text-[11px] mt-1.5 font-mono" style={{ color: "#5c5f7a" }}>{metric.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION 3: BUILD PIPELINE ─── */
function BuildPipeline() {
  const [activeBuild, setActiveBuild] = useState("all");
  const builds = [
    { id: "alpha", label: "Alpha", version: "0.9.0", status: "building", progress: 67, color: "#fbbf24" },
    { id: "beta", label: "Beta", version: "1.0.0-rc2", status: "passing", progress: 100, color: "#34d399" },
    { id: "stable", label: "Stable", version: "1.0.0", status: "deployed", progress: 100, color: "#818cf8" },
    { id: "patch", label: "Patch", version: "1.0.1", status: "queued", progress: 0, color: "#5c5f7a" },
  ];

  const pipeline = [
    { step: "Source Checkout", icon: Code2, status: "done" as const },
    { step: "Dependency Resolution", icon: Package, status: "done" as const },
    { step: "Kernel Compilation", icon: CpuIcon, status: "running" as const },
    { step: "Module Linking", icon: Layers, status: "pending" as const },
    { step: "Driver Integration", icon: Hexagon, status: "pending" as const },
    { step: "Package Verification", icon: Shield, status: "pending" as const },
    { step: "Automated Testing", icon: Bug, status: "pending" as const },
    { step: "ISO Generation", icon: Disc, status: "pending" as const },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <GitBranch className="w-4 h-4" style={{ color: "#818cf8" }} />
          Build Pipeline
        </h2>
        <div className="flex gap-1">
          {builds.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBuild(b.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                activeBuild === b.id
                  ? "text-white"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={activeBuild === b.id ? { background: b.color } : { color: "#8b8fa3" }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl p-5" style={{ background: "rgba(14,14,21,0.6)", border: "1px solid rgba(26,26,46,0.8)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(129,140,248,0.1)" }}>
                <GitPullRequest className="w-4 h-4" style={{ color: "#818cf8" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e8edf5" }}>runix-kernel v{builds.find(b => b.id === activeBuild)?.version}</p>
                <p className="text-[11px] font-mono" style={{ color: "#5c5f7a" }}>feat/memory-management · commit a3f8c2e</p>
              </div>
            </div>
            <span className="dashboard-badge dashboard-badge-warning dash-animate-pulse">Building</span>
          </div>
          <div className="space-y-1.5">
            {pipeline.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: "rgba(7,7,11,0.5)" }}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.status === "done" ? "bg-emerald-500/20 text-emerald-400" :
                  item.status === "running" ? "bg-blue-500/20 text-blue-400" :
                  "bg-[rgba(26,26,46,0.8)] text-[#5c5f7a]"
                }`}>
                  {item.status === "done" ? <CheckCircle2 className="w-3 h-3" /> :
                   item.status === "running" ? <Radio className="w-3 h-3 dash-animate-pulse" /> :
                   <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5c5f7a" }} />}
                </div>
                <span className="text-[12px] font-mono" style={{ color: item.status === "done" ? "#34d399" : item.status === "running" ? "#818cf8" : "#5c5f7a" }}>
                  {item.step}
                </span>
                {item.status === "running" && (
                  <motion.span className="ml-auto text-[10px] font-mono dash-animate-blink" style={{ color: "#818cf8" }}>Compiling...</motion.span>
                )}
                {item.status === "done" && (
                  <span className="ml-auto text-[10px]" style={{ color: "#5c5f7a" }}>0.8s</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {builds.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="rounded-xl p-4" style={{ background: "rgba(14,14,21,0.6)", border: "1px solid rgba(26,26,46,0.8)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: "#8b8fa3" }}>{b.label}</span>
                <span className={`dashboard-badge ${
                  b.status === "deployed" ? "dashboard-badge-success" :
                  b.status === "passing" ? "dashboard-badge-success" :
                  b.status === "building" ? "dashboard-badge-warning" :
                  "dashboard-badge-primary"
                }`}>
                  {b.status}
                </span>
              </div>
              <p className="text-sm font-bold font-mono" style={{ color: "#e8edf5" }}>v{b.version}</p>
              <ProgressBar value={b.progress} color={b.color} />
              <p className="text-[10px] mt-1 font-mono" style={{ color: "#5c5f7a" }}>{b.progress}% complete</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* The `Disc` icon is used above — alias from lucide */
function Disc(props: any) { return <Monitor {...props} />; }

/* ─── SECTION 4: COMMUNITY + CONTRIBUTOR HUB ─── */
function CommunityHub() {
  const contributors = [
    { name: "aditya.sharma", commits: 847, prs: 42, rank: 1, color: "#818cf8", role: "Core" },
    { name: "elena.chen", commits: 523, prs: 28, rank: 2, color: "#34d399", role: "Kernel" },
    { name: "marcus.j", commits: 412, prs: 19, rank: 3, color: "#22d3ee", role: "Drivers" },
    { name: "sarah.k", commits: 298, prs: 15, rank: 4, color: "#fbbf24", role: "Testing" },
    { name: "raj.p", commits: 187, prs: 11, rank: 5, color: "#f87171", role: "UI" },
  ];

  const discussions = [
    { title: "Memory management improvements for v2", replies: 34, views: 892, tag: "kernel", active: "2m ago" },
    { title: "USB 4.0 driver stack proposal", replies: 21, views: 543, tag: "drivers", active: "15m ago" },
    { title: "GUI compositor performance benchmarks", replies: 18, views: 421, tag: "ui", active: "1h ago" },
    { title: "Package manager design RFC", replies: 27, views: 678, tag: "features", active: "3h ago" },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <Users className="w-4 h-4" style={{ color: "#818cf8" }} />
          Community Hub
        </h2>
        <Link href="/community">
          <span className="text-[11px] flex items-center gap-1" style={{ color: "#818cf8" }}>View all <ExternalLink className="w-3 h-3" /></span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-xl p-4" style={{ background: "rgba(14,14,21,0.6)", border: "1px solid rgba(26,26,46,0.8)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: "#8b8fa3" }}>
              <MessageSquare className="w-3.5 h-3.5" /> Active Discussions
            </span>
          </div>
          <div className="space-y-1">
            {discussions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-hover group cursor-pointer"
                style={{ background: "rgba(7,7,11,0.4)" }}
                whileHover={{ background: "rgba(129,140,248,0.04)" }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "rgba(129,140,248,0.1)", color: "#818cf8" }}>{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: "#e8edf5" }}>{d.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="dashboard-badge dashboard-badge-primary text-[9px]">{d.tag}</span>
                      <span className="text-[10px]" style={{ color: "#5c5f7a" }}>{d.active}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <span className="text-[11px]" style={{ color: "#5c5f7a" }}>{d.replies} replies</span>
                  <span className="text-[11px]" style={{ color: "#5c5f7a" }}>{d.views} views</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-xl p-4" style={{ background: "rgba(14,14,21,0.6)", border: "1px solid rgba(26,26,46,0.8)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: "#8b8fa3" }}>
              <Award className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} /> Leaderboard
            </span>
          </div>
          <div className="space-y-1">
            {contributors.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-default"
                style={{ background: i === 0 ? "rgba(129,140,248,0.06)" : "transparent" }}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{
                  background: i === 0 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : i === 1 ? "linear-gradient(135deg, #94a3b8, #64748b)" : i === 2 ? "linear-gradient(135deg, #d97706, #b45309)" : "rgba(26,26,46,0.8)",
                  color: i < 3 ? "#000" : "#5c5f7a"
                }}>{c.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "#e8edf5" }}>{c.name}</p>
                  <div className="flex items-center gap-2 text-[10px]" style={{ color: "#5c5f7a" }}>
                    <span>{c.commits} commits</span>
                    <span>{c.prs} PRs</span>
                  </div>
                </div>
                <span className="dashboard-badge text-[9px]" style={{ background: `${c.color}15`, color: c.color }}>{c.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Award(props: any) { return <Zap {...props} />; }

/* ─── SECTION 5: SYSTEM ANALYTICS ─── */
function SystemAnalytics() {
  const metrics = [
    { label: "User Growth", value: 2847, change: "+12.4%", positive: true, color: "#818cf8" },
    { label: "Beta Testers", value: 623, change: "+8.2%", positive: true, color: "#34d399" },
    { label: "Build Downloads", value: 15920, change: "+24.7%", positive: true, color: "#22d3ee" },
    { label: "Infra Load", value: 68, change: "+5.3%", positive: false, color: "#fbbf24" },
    { label: "Kernel Stability", value: 99.8, suffix: "%", change: "+0.2%", positive: true, color: "#818cf8" },
    { label: "Release Adoption", value: 76, suffix: "%", change: "+11.5%", positive: true, color: "#34d399" },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <BarChart3 className="w-4 h-4" style={{ color: "#818cf8" }} />
          System Analytics
        </h2>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: "#5c5f7a" }}>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "#818cf8" }} /> This month</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "rgba(26,26,46,0.8)" }} /> Last month</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="dashboard-metric p-4"
          >
            <p className="text-[11px] font-medium mb-2" style={{ color: "#5c5f7a" }}>{m.label}</p>
            <p className="text-xl font-bold font-mono" style={{ color: "#e8edf5" }}>
              <AnimatedCounter target={m.value} suffix={m.suffix || ""} duration={1500} />
            </p>
            <div className="flex items-center gap-1 mt-1">
              {m.positive ? <ArrowUp className="w-3 h-3" style={{ color: "#34d399" }} /> : <ArrowDown className="w-3 h-3" style={{ color: "#f87171" }} />}
              <span className="text-[11px] font-medium" style={{ color: m.positive ? "#34d399" : "#f87171" }}>{m.change}</span>
            </div>
            <div className="mt-2">
              <ProgressBar value={m.positive ? 85 : 68} color={m.color} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION 6: QUICK TERMINAL PANEL ─── */
function TerminalPanel() {
  const logs = [
    { time: "14:32:01", level: "INFO", msg: "kernel: Runix v1.0.0-boot initializing (6.8.0-runix)", color: "#8b8fa3" },
    { time: "14:32:01", level: "INFO", msg: "kernel: SMP: 8 cores / 16 threads, NUMA enabled", color: "#8b8fa3" },
    { time: "14:32:02", level: "OK", msg: "mem: 8192MB detected, page tables mapped, KASLR enabled", color: "#34d399" },
    { time: "14:32:02", level: "OK", msg: "fs: ext4 root mounted, journaling active", color: "#34d399" },
    { time: "14:32:03", level: "INFO", msg: "net: eth0 — 10 Gbps link, DHCP lease 192.168.1.100", color: "#8b8fa3" },
    { time: "14:32:03", level: "OK", msg: "drv: nvidia 545.23 loaded, 2 devices initialized", color: "#34d399" },
    { time: "14:32:04", level: "WARN", msg: "pci: AER — correctable error on bus 03:00.0", color: "#fbbf24" },
    { time: "14:32:04", level: "OK", msg: "init: Runix Desktop Environment ready — user space online", color: "#34d399" },
  ];

  const [line, setLine] = useState(1);

  useEffect(() => {
    if (line < logs.length) {
      const t = setTimeout(() => setLine(l => l + 1), 800 + Math.random() * 400);
      return () => clearTimeout(t);
    }
  }, [line]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <Terminal className="w-4 h-4" style={{ color: "#818cf8" }} />
          System Terminal
        </h2>
        <button className="text-[11px] px-2 py-1 rounded-lg" style={{ color: "#5c5f7a", background: "rgba(26,26,46,0.6)" }}>
          Clear
        </button>
      </div>
      <div className="dashboard-terminal rounded-xl p-4 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(26,26,46,0.8)" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-xs font-mono flex items-center gap-2" style={{ color: "#5c5f7a" }}>
            <Terminal className="w-3 h-3" style={{ color: "#34d399" }} />
            runix@boot:~$ dmesg --tail
          </span>
        </div>
        <div className="space-y-1 min-h-[160px]">
          <AnimatePresence>
            {logs.slice(0, line).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 font-mono text-[11px] leading-relaxed"
              >
                <span className="flex-shrink-0 w-16" style={{ color: "#5c5f7a" }}>{log.time}</span>
                <span className={`flex-shrink-0 w-12 font-semibold ${
                  log.level === "OK" ? "text-emerald-400" :
                  log.level === "WARN" ? "text-amber-400" :
                  "text-blue-400"
                }`}>[{log.level}]</span>
                <span style={{ color: log.color }}>{log.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {line <= logs.length && (
            <motion.span
              className="inline-block w-2 h-4 bg-emerald-400 ml-[148px]"
              style={{ animation: "dash-blink 0.8s step-end infinite" }}
            />
          )}
          {line > logs.length && (
            <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: "1px solid rgba(26,26,46,0.5)" }}>
              <span className="text-emerald-400 font-mono text-xs">$</span>
              <span className="text-xs font-mono text-emerald-400 terminal-text">./runix --status</span>
              <motion.span
                className="inline-block w-2 h-4 bg-emerald-400"
                style={{ animation: "dash-blink 0.8s step-end infinite" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION 7: DOWNLOAD & ENVIRONMENT CENTER ─── */
function DownloadCenter() {
  const builds = [
    { name: "Runix OS x86_64", version: "1.0.0", size: "2.4 GB", type: "ISO", status: "stable", progress: 100 },
    { name: "Runix OS ARM64", version: "1.0.0", size: "2.1 GB", type: "IMG", status: "stable", progress: 100 },
    { name: "Runix OS Developer Kit", version: "1.0.0", size: "856 MB", type: "SDK", status: "beta", progress: 100 },
    { name: "Kernel Headers", version: "6.8.0", size: "124 MB", type: "DEV", status: "stable", progress: 100 },
    { name: "Driver SDK (Experimental)", version: "0.9.0", size: "342 MB", type: "EXP", status: "alpha", progress: 0 },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <Download className="w-4 h-4" style={{ color: "#818cf8" }} />
          Download Center
        </h2>
        <span className="text-[11px]" style={{ color: "#5c5f7a" }}>15,920 total downloads</span>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(26,26,46,0.8)" }}>
        <div className="grid grid-cols-12 gap-0 text-[11px] font-semibold px-4 py-2.5" style={{ background: "rgba(7,7,11,0.6)", color: "#5c5f7a", borderBottom: "1px solid rgba(26,26,46,0.8)" }}>
          <span className="col-span-4">Build</span>
          <span className="col-span-2">Version</span>
          <span className="col-span-1">Size</span>
          <span className="col-span-1">Type</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2 text-right">Action</span>
        </div>
        {builds.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-12 gap-0 items-center px-4 py-3 text-xs group cursor-default"
            style={{ borderBottom: i < builds.length - 1 ? "1px solid rgba(26,26,46,0.5)" : "none", background: "rgba(14,14,21,0.4)" }}
            whileHover={{ background: "rgba(129,140,248,0.04)" }}
          >
            <span className="col-span-4 font-medium" style={{ color: "#e8edf5" }}>{b.name}</span>
            <span className="col-span-2 font-mono" style={{ color: "#8b8fa3" }}>v{b.version}</span>
            <span className="col-span-1" style={{ color: "#5c5f7a" }}>{b.size}</span>
            <span className="col-span-1">
              <span className="dashboard-badge text-[9px]" style={{ background: "rgba(26,26,46,0.8)", color: "#5c5f7a" }}>{b.type}</span>
            </span>
            <span className="col-span-2">
              <span className={`dashboard-badge text-[9px] ${
                b.status === "stable" ? "dashboard-badge-success" :
                b.status === "beta" ? "dashboard-badge-warning" :
                "dashboard-badge-primary"
              }`}>{b.status}</span>
            </span>
            <span className="col-span-2 text-right">
              <motion.button
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all"
                style={{ background: "rgba(129,140,248,0.1)", color: "#818cf8" }}
                whileHover={{ background: "rgba(129,140,248,0.2)" }}
              >
                Download
              </motion.button>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION 8: AI ASSISTANT PANEL ─── */
function AIAssistant() {
  const insights = [
    { icon: Zap, text: "Kernel compilation time reduced by 18% with LTO optimization", color: "#34d399" },
    { icon: Shield, text: "Memory page allocation improved — consider transparent HugePages", color: "#818cf8" },
    { icon: Activity, text: "Network throughput at 92% — driver optimization recommended", color: "#22d3ee" },
    { icon: Cpu, text: "CPU governor set to 'performance' — power draw is elevated", color: "#fbbf24" },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#e8edf5" }}>
          <Zap className="w-4 h-4" style={{ color: "#818cf8" }} />
          System Assistant
        </h2>
        <span className="dashboard-badge dashboard-badge-primary text-[9px] dash-animate-pulse">AI Active</span>
      </div>
      <div className="dashboard-glow-edge rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.06), rgba(6,182,212,0.02))" }}>
        <div className="flex items-start gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(26,26,46,0.8)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 dash-animate-float" style={{ background: "rgba(129,140,248,0.1)" }}>
            <Zap className="w-4 h-4" style={{ color: "#818cf8" }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#e8edf5" }}>AI Diagnostics</p>
            <p className="text-xs" style={{ color: "#8b8fa3" }}>All metrics within expected ranges. 2 optimization suggestions available.</p>
          </div>
        </div>
        <div className="space-y-2">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-start gap-3 px-3 py-2 rounded-lg cursor-default"
              style={{ background: "rgba(7,7,11,0.4)" }}
            >
              <item.icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: item.color }} />
              <p className="text-xs leading-relaxed" style={{ color: "#8b8fa3" }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD PAGE ─── */
export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-dashboard">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#818cf8", borderTopColor: "transparent" }} />
          <p className="text-sm font-mono" style={{ color: "#5c5f7a" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userName = user.displayName || user.email?.split("@")[0] || "Developer";

  return (
    <div className="flex dark-dashboard" style={{ minHeight: "calc(100vh - 64px)" }}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className="flex-1 overflow-y-auto dashboard-grid-bg" style={{ background: "#07070b" }}>
        <div className="sticky top-0 z-30" style={{ background: "rgba(7,7,11,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(26,26,46,0.8)" }}>
          <div className="flex items-center gap-4 px-6 h-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#5c5f7a" }} />
              <input
                ref={searchRef}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search commands, builds, docs..."
                className="w-full max-w-md pl-9 pr-3 py-1.5 text-xs rounded-lg outline-none transition-all font-mono"
                style={{
                  background: searchFocused ? "rgba(129,140,248,0.06)" : "rgba(14,14,21,0.6)",
                  color: "#e8edf5",
                  border: `1px solid ${searchFocused ? "rgba(129,140,248,0.3)" : "rgba(26,26,46,0.8)"}`,
                }}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(26,26,46,0.8)", color: "#5c5f7a", fontFamily: "inherit" }}>
                Ctrl+K
              </kbd>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#5c5f7a" }}>
                <LiveDot color="emerald" />
                <span className="hidden sm:inline">Runtime: v1.0.0</span>
              </div>
              <motion.button className="relative p-1.5 rounded-lg transition-colors" style={{ background: "rgba(14,14,21,0.6)", color: "#8b8fa3" }} whileHover={{ background: "rgba(129,140,248,0.06)" }}>
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-[rgba(7,7,11,1)]" />
              </motion.button>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", color: "#fff" }}>
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <HeroPanel userName={userName} />
          <SystemStatusGrid />
          <BuildPipeline />
          <CommunityHub />
          <SystemAnalytics />
          <TerminalPanel />
          <DownloadCenter />
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}
