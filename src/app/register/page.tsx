"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Shield, Terminal, Cpu, Activity, Globe, UserPlus } from "lucide-react";
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

      <motion.div
        className="auth-float absolute w-64 h-64 rounded-full opacity-[0.04]"
        style={{ left: "10%", top: "20%", background: "radial-gradient(circle, #818cf8, transparent)" }}
      />
      <motion.div
        className="auth-float-delayed absolute w-48 h-48 rounded-full opacity-[0.03]"
        style={{ right: "15%", bottom: "25%", background: "radial-gradient(circle, #22d3ee, transparent)" }}
      />

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
            Enter the
            <br />
            <span style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Runix Ecosystem
            </span>
          </h1>

          <p className="text-sm mb-10" style={{ color: "#5c5f7a" }}>
            Join the next generation of developers building the future of computing.
          </p>

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
                  {'>'} Identity modules loaded. Ready to register.
                  <span className="auth-typing-cursor" style={{ background: "#34d399" }} />
                </motion.div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Cpu, label: "Kernel", value: "6.8.0-runix", color: "#818cf8" },
              { icon: Shield, label: "Security", value: "SELinux enforcing", color: "#34d399" },
              { icon: Activity, label: "Build", value: "v1.0.0-boot (stable)", color: "#22d3ee" },
              { icon: Globe, label: "Community", value: "2,847 developers", color: "#818cf8" },
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name || undefined);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split">
      <BrandPanel />
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ background: "#07070b" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          <div className="auth-panel-inner">
            <div className="mb-7 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, rgba(129,140,248,0.12), rgba(6,182,212,0.08))" }}
              >
                <UserPlus className="w-6 h-6" style={{ color: "#818cf8" }} />
              </motion.div>
              <h1 className="text-xl font-bold mb-1" style={{ color: "#e8edf5" }}>Create your account</h1>
              <p className="text-sm" style={{ color: "#5c5f7a" }}>Join the Runix developer ecosystem</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8fa3" }}>Full name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8fa3" }}>Email</label>
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
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8fa3" }}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className={`auth-input pr-10 ${error && password.length > 0 && password.length < 8 ? "auth-input-error" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#5c5f7a" }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {password.length >= 8 ? (
                      <CheckCircle2 className="w-3 h-3" style={{ color: "#34d399" }} />
                    ) : (
                      <div className="w-3 h-3 rounded-full border" style={{ borderColor: "#5c5f7a" }} />
                    )}
                    <span className="text-[11px]" style={{ color: "#5c5f7a" }}>At least 8 characters</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8fa3" }}>Confirm password</label>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`auth-input ${error && confirmPassword.length > 0 && password !== confirmPassword ? "auth-input-error" : ""}`}
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[rgba(26,26,46,0.8)] bg-[rgba(7,7,11,0.6)] accent-[#818cf8]"
                />
                <span className="text-xs leading-relaxed" style={{ color: "#8b8fa3" }}>
                  I agree to the{" "}
                  <span className="auth-link cursor-pointer">Terms of Service</span> and{" "}
                  <span className="auth-link cursor-pointer">Privacy Policy</span>
                </span>
              </label>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                  style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.15)" }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button type="submit" disabled={loading} className="auth-btn-primary flex items-center justify-center gap-2">
                {loading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : null}
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="auth-or my-4">
              <div className="auth-line" />
              <span className="auth-or-text">or continue with</span>
              <div className="auth-line" />
            </div>

            <button type="button" className="auth-btn-google">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <div className="mt-5 pt-4 text-center" style={{ borderTop: "1px solid rgba(26,26,46,0.6)" }}>
              <p className="text-xs" style={{ color: "#5c5f7a" }}>
                Already have an account?{" "}
                <Link href="/login" className="auth-link">Sign in</Link>
              </p>
            </div>

            <p className="mt-3 text-[10px] text-center" style={{ color: "#5c5f7a" }}>
              Protected by end-to-end encryption. Your data is secure.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
