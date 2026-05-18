"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about",      label: "Vision"      },
  { href: "/ecosystem",  label: "Ecosystem"   },
  { href: "/technology", label: "Technology"  },
  { href: "/products",   label: "Modules"     },
  { href: "/research",   label: "Research"    },
  { href: "/careers",    label: "Careers"     },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const pathname                  = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#050508]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-runix-cyan/10 border border-runix-cyan/30 text-runix-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform group-hover:scale-110 duration-300">
              <span className="font-mono font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold tracking-[0.2em] text-white">
              RUNIX
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-runix-cyan after:transition-all after:duration-300",
                  pathname === link.href
                    ? "text-runix-cyan after:w-full"
                    : "text-slate-400 hover:text-white after:w-0 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full text-sm font-semibold text-slate-950 bg-runix-cyan hover:bg-runix-cyan/90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              Engage Systems
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#050508]/95 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center justify-center h-full gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-3xl font-bold tracking-tight transition-colors",
                      pathname === link.href
                        ? "text-runix-cyan"
                        : "text-white hover:text-runix-cyan"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-full text-base font-semibold text-slate-950 bg-runix-cyan"
                >
                  Engage Systems
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
