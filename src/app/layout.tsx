import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "RUNIX | Advanced AI Infrastructure",
  description: "Futuristic AI ecosystem company focusing on adaptive runtime infrastructure, AI employees, and autonomous workflows.",
};

import Navbar from "@/components/Navbar";

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030305] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center rounded bg-runix-cyan/10 border border-runix-cyan/30 text-runix-cyan">
              <span className="font-mono font-bold">R</span>
            </div>
            <span className="text-xl font-bold tracking-[0.2em] text-white">RUNIX</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Building the nervous system for the next generation of autonomous infrastructure and AI execution.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Architecture</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/ecosystem" className="hover:text-runix-cyan transition-colors">Ecosystem</Link></li>
            <li><Link href="/technology" className="hover:text-runix-cyan transition-colors">Technology</Link></li>
            <li><Link href="/products" className="hover:text-runix-cyan transition-colors">Modules</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-runix-cyan transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-runix-cyan transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-runix-cyan transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/portal" className="hover:text-runix-cyan transition-colors">Terminal Portal</Link></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-runix-cyan transition-colors">GitHub Matrix</a></li>
            <li><Link href="/status" className="hover:text-runix-cyan transition-colors">System Status</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} RUNIX Systems. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-slate-300">Privacy Protocols</Link>
          <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-runix-card/40 via-runix-bg to-runix-bg -z-10" />
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
