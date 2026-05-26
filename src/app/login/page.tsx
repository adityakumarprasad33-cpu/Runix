"use client";

import { Suspense, useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, AlertCircle, Shield, Terminal, Cpu, Wifi, Activity, HardDrive, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

function BrandPanel() {
  const [typedLine, setTypedLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const lines = [
    { text: "Initializing secure environment...", color: "#818cf8" },
    { text: "Loading Runix identity modules...", color: "#22d3ee" },
    { text: "Verifying developer access...", color: "#34d399" },
    { text: "Preparing Runix workspace...", color: "#818cf8" },
  ];

  useEffect(() => {
    if (typedLine >= lines.length) return;
    const currentLine = lines[typedLine].text;
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayText((prev) => prev + currentLine[charIndex]);
        setCharIndex((c) => c + 1);
      }, 35 + Math.random() * 20);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTypedLine((l) => l + 1);
      setCharIndex(0);
      setDisplayText("");
    }, 600);
    return () => clearTimeout(t);
  }, [typedLine, charIndex, lines]);

  return (
    <div className="auth-brand">
      <div className="auth-brand-grid" />
      <div className="auth-brand-gradient" />

      {/* Floating orbs */}
      <motion.div
        className="auth-float absolute w-64 h-64 rounded-full opacity-[0.04]"
        style={{ left: "10%", top: "20%", background: "radial-gradient(circle, #818cf8, transparent)" }}
      />
      <motion.div
        className="auth-float-delayed absolute w-48 h-48 rounded-full opacity-[0.03]"
        style={{ right: "15%", bottom: "25%", background: "radial-gradient(circle, #22d3ee, transparent)" }}
      />

      {/* Infrastructure lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute h-px w-full"
          style={{ top: "40%", background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.08), transparent)" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-px w-full"
          style={{ top: "60%", background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.06), transparent)" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="auth-panel px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", color: "#fff" }}>
              R
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: "#e8edf5" }}>Runix</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4" style={{ color: "#e8edf5" }}>
            Access the Future
            <br />
            <span style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              of Computing
            </span>
          </h1>

          <p className="text-sm mb-10" style={{ color: "#5c5f7a" }}>
            Runix OS v1.0.0 — Kernel 6.8.0. Secure, fast, built for the next era.
          </p>

          {/* Terminal typing */}
          <div className="dashboard-terminal rounded-lg p-4 mb-8" style={{ minHeight: "104px" }}>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[10px] font-mono" style={{ color: "#5c5f7a" }}>runix@auth:~$</span>
            </div>
            <div className="font-mono text-xs space-y-1">
              <AnimatePresence mode="popLayout">
                {lines.slice(0, typedLine).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: line.color }}
                  >
                    {'>'} {line.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {typedLine < lines.length && (
                <motion.div key="typing" style={{ color: lines[typedLine].color }}>
                  {'>'} {displayText}
                  <span className="auth-typing-cursor" />
                </motion.div>
              )}
              {typedLine >= lines.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: "#34d399" }}
                >
                  {'>'} Access granted. Welcome back.
                  <span className="auth-typing-cursor" style={{ background: "#34d399" }} />
                </motion.div>
              )}
            </div>
          </div>

          {/* System widgets */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Cpu, label: "Kernel", value: "6.8.0-runix", color: "#818cf8" },
              { icon: Shield, label: "Security", value: "SELinux enforcing", color: "#34d399" },
              { icon: Activity, label: "Build", value: "v1.0.0-boot (stable)", color: "#22d3ee" },
              { icon: Globe, label: "Network", value: "10 Gbps — encrypted", color: "#818cf8" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                style={{ background: "rgba(14,14,21,0.5)", border: "1px solid rgba(26,26,46,0.8)" }}
              >
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${item.color}12` }}>
                  <item.icon className="w-3 h-3" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-[10px] font-medium" style={{ color: "#5c5f7a" }}>{item.label}</p>
                  <p className="text-[11px] font-semibold" style={{ color: "#e8edf5" }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 lg:p-8" style={{ background: "#07070b" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[400px]"
      >
        <div className="auth-panel-inner">
          <div className="mb-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.12), rgba(6,182,212,0.08))" }}
            >
              <Shield className="w-5 h-5" style={{ color: "#818cf8" }} />
            </motion.div>
            <h1 className="text-lg font-bold mb-1.5" style={{ color: "#e8edf5" }}>Welcome back</h1>
            <p className="text-sm" style={{ color: "#5c5f7a" }}>Sign in to your Runix account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#8b8fa3" }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium" style={{ color: "#8b8fa3" }}>
                  Password
                </label>
                <button type="button" className="text-sm auth-link hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`auth-input pr-10 ${error ? "auth-input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-white/80"
                  style={{ color: "#5c5f7a" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && password.length > 0 && (
                <p className="mt-1 text-xs text-red-400" style={{ color: "#f87171" }}>
                  Invalid password
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" className="w-4 h-4 rounded border-[rgba(26,26,46,0.8)] bg-[rgba(7,7,11,0.6)] accent-[#818cf8]" />
              <span className="text-sm" style={{ color: "#8b8fa3" }}>Remember me</span>
            </label>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.15)" }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span style={{ color: "#f87171" }}>{error}</span>
              </motion.div>
            )}

            <button type="submit" disabled={loading} className="w-full auth-btn-primary flex items-center justify-center gap-2 py-2">
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="auth-or my-6">
            <div className="auth-line" />
            <span className="auth-or-text text-sm" style={{ color: "#5c5f7a" }}>or continue with</span>
            <div className="auth-line" />
          </div>

          <button type="button" className="w-full auth-btn-google flex items-center justify-center gap-3 py-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: "1px solid rgba(26,26,46,0.6)" }}>
            <p className="text-sm" style={{ color: "#5c5f7a" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="auth-link hover:underline">Create account</Link>
            </p>
          </div>

          <p className="mt-3 text-xs text-center" style={{ color: "#5c5f7a" }}>
            Protected by end-to-end encryption. Your data is secure.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="auth-split">
      <BrandPanel />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center" style={{ background: "#07070b" }}>
          <div className="w-6 h-6 border-2 border-[#818cf8] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
