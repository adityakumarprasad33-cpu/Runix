"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Avatar from "@/components/ui/Avatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/os", label: "Runix OS" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/community", label: "Community" },
  { href: "/news", label: "News" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-glass border-b" : "bg-transparent"
        }`}
        style={{
          background: scrolled ? "var(--bg-primary)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* ─── Futuristic Logo ─── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-9 h-9">
              <motion.div
                className="absolute inset-0 rounded-xl opacity-40 blur-md"
                style={{ background: "linear-gradient(135deg, #4f46e5, #06b6d4)" }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative w-full h-full rounded-xl flex items-center justify-center border"
                style={{
                  background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(6,182,212,0.1))",
                  borderColor: "rgba(79,70,229,0.3)",
                }}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <span
                  className="text-sm font-bold gradient-primary animate-gradient"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  R
                </span>
              </motion.div>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-base font-bold tracking-tight"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
              >
                Runix
              </span>
              <span className="text-[9px] font-medium tracking-widest uppercase gradient-primary animate-gradient">
                Systems
              </span>
            </div>
          </Link>

          {/* ─── Desktop Nav ─── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: "var(--primary)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ─── Right side ─── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Avatar name={user.displayName || user.email || "User"} size="sm" />
                  <span className="text-sm max-w-[100px] truncate">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                  style={{ color: "var(--text-muted)" }}
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="relative px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 overflow-hidden group"
                  style={{ background: "var(--primary)" }}
                >
                  <motion.span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
                    }}
                  />
                  <span className="relative z-10">Sign up</span>
                </Link>
              </div>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border)",
              }}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Nav ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden backdrop-glass"
            style={{ background: "var(--bg-primary)" }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-xl font-medium transition-colors"
                      style={{
                        color: isActive ? "var(--primary)" : "var(--text-secondary)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-4 flex flex-col items-center gap-3"
              >
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-base"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-6 py-2 rounded-lg text-base font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="px-6 py-2 rounded-lg text-base font-medium text-white"
                      style={{ background: "var(--primary)" }}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
