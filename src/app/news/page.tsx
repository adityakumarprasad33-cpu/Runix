"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const articles = [
  {
    id: "1",
    title: "Runix Alpha Release: What's Inside",
    excerpt:
      "A deep dive into the first public alpha build of Runix, including kernel architecture, driver model, and how to get started.",
    category: "Release Notes",
    date: "May 15, 2026",
    author: "Runix Team",
  },
  {
    id: "2",
    title: "Why We Chose Rust for the Runix Kernel",
    excerpt:
      "An exploration of our decision to build the Runix kernel in Rust — memory safety, performance, and the future of systems programming.",
    category: "Dev Diary",
    date: "April 28, 2026",
    author: "Alex Chen",
  },
  {
    id: "3",
    title: "Community Spotlight: Early Kernel Contributors",
    excerpt:
      "Highlighting the amazing contributions from our community members who helped shape the early stages of the Runix kernel.",
    category: "Community",
    date: "April 10, 2026",
    author: "Runix Team",
  },
  {
    id: "4",
    title: "Runix Roadmap Update: Q2 2026",
    excerpt:
      "Our quarterly roadmap update covering recent milestones, current priorities, and what to expect in the coming months.",
    category: "Release Notes",
    date: "March 22, 2026",
    author: "Sarah Williams",
  },
];

const badgeGradient: Record<string, string> = {
  "Release Notes": "bg-gradient-to-r from-[var(--primary)] to-purple-500 text-white border-transparent",
  "Dev Diary": "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent",
  "Community": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent",
};

const badgeVariant: Record<string, "primary" | "warning" | "default"> = {
  "Release Notes": "primary",
  "Dev Diary": "warning",
  "Community": "default",
};

export default function NewsPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full min-h-[30vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              News & <span className="text-gradient">Updates</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              The latest from the Runix development team. Release notes, dev
              diaries, and community highlights.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="w-full section-padding border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {articles.map((article, i) => (
            <SectionReveal key={article.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/news/${article.id}`} className="block group">
                  <Card className="p-6 relative overflow-hidden transition-all duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-transparent rounded-xl" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          variant={badgeVariant[article.category]}
                        >
                          {article.category}
                        </Badge>
                        <span className="text-xs text-[var(--text-muted)]">
                          {article.date}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-[var(--text-muted)]">
                          By {article.author}
                        </span>
                        <span className="text-xs font-medium text-[var(--primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
