"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import Badge from "@/components/ui/Badge";

const articles: Record<string, any> = {
  "1": {
    title: "Runix Alpha Release: What's Inside",
    category: "Release Notes",
    date: "May 15, 2026",
    author: "Runix Team",
    content: `
      <p>We are excited to announce the first public alpha release of Runix. This initial build represents thousands of hours of engineering effort and marks the beginning of our journey toward a stable, production-ready operating system.</p>
      <h3>What's Included</h3>
      <p>The alpha release includes the core Runix microkernel, basic device drivers for x86-64 systems, a minimal shell environment, and the build system for developers who want to contribute.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Fully functional microkernel with IPC</li>
        <li>Memory management with paging support</li>
        <li>Multi-threaded process scheduler</li>
        <li>AHCI and NVMe storage drivers</li>
        <li>PS/2 and USB keyboard input</li>
        <li>VESA framebuffer display output</li>
      </ul>
      <h3>Getting Started</h3>
      <p>To try the alpha build, you can either run it in QEMU or boot it on bare metal. Visit our GitHub repository for build instructions and pre-built disk images.</p>
    `,
  },
  "2": {
    title: "Why We Chose Rust for the Runix Kernel",
    category: "Dev Diary",
    date: "April 28, 2026",
    author: "Alex Chen",
    content: `
      <p>When we started designing Runix, one of the first decisions we had to make was which language to use for the kernel. After careful evaluation, we chose Rust — and here is why.</p>
      <h3>Memory Safety Without GC</h3>
      <p>Rust's ownership model gives us memory safety guarantees without needing a garbage collector. In a kernel context, this means we can prevent entire classes of vulnerabilities at compile time without sacrificing performance.</p>
      <h3>Zero-Cost Abstractions</h3>
      <p>Rust's abstractions compile down to the same machine code you would write in C, but with stronger type safety and better tooling. We get the performance of C with the safety of a modern language.</p>
      <h3>The Ecosystem</h3>
      <p>The Rust ecosystem for systems programming has matured significantly. From <code>alloc</code> to cross-compilation toolchains, the tooling is ready for production kernel development.</p>
    `,
  },
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const article = articles[id];

  if (!article) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full section-padding">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <SectionReveal>
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant={
                  article.category === "Release Notes"
                    ? "primary"
                    : article.category === "Dev Diary"
                    ? "warning"
                    : "default"
                }
              >
                {article.category}
              </Badge>
              <span className="text-sm text-[var(--text-muted)]">
                {article.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {article.title}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mb-10">
              By {article.author}
            </p>
            <div
              className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)] prose-code:text-[var(--primary)]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
