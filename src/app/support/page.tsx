"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, Mail, BookOpen, ExternalLink } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const faqs = [
  {
    q: "How do I get early access to Runix?",
    a: "Apply through our Early Access page. Applications are reviewed on a rolling basis, and approved members receive access to development builds and private community channels.",
  },
  {
    q: "Is Runix open source?",
    a: "Yes! Runix is fully open source. You can find all of our code on GitHub, including the kernel, drivers, and user-space components.",
  },
  {
    q: "What hardware does Runix support?",
    a: "Currently Runix supports x86-64 systems. ARM64 and RISC-V support are planned for the Beta phase. See our Roadmap for details.",
  },
  {
    q: "Can I contribute to Runix?",
    a: "Absolutely. We welcome contributions of all kinds — code, documentation, testing, and design. Join our community to get started.",
  },
  {
    q: "When will Runix v1.0 be released?",
    a: "We are targeting H2 2027 for the stable v1.0 release. Early access builds are available now for community members.",
  },
];

export default function SupportPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full min-h-[30vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Support & <span className="text-gradient">Contact</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Have a question? Need help? We are here for you.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="w-full section-padding border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Community Forum",
                desc: "Ask questions and get help from the community.",
                action: "Join Discussion",
                href: "/community",
              },
              {
                icon: BookOpen,
                title: "Documentation",
                desc: "Read the official Runix documentation and guides.",
                action: "Read Docs",
                href: "#",
              },
              {
                icon: ExternalLink,
                title: "GitHub Issues",
                desc: "Report bugs or request features on GitHub.",
                action: "Open Issues",
                href: "#",
              },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <Card className="p-6 text-center h-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent rounded-xl" />
                    </div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                        <item.icon className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">
                        {item.desc}
                      </p>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                      >
                        {item.action} &rarr;
                      </a>
                    </div>
                  </Card>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full section-padding border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <Card hover={false} className="overflow-hidden relative">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-transparent rounded-xl" />
                    </div>
                    <div className="relative z-10">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {faq.q}
                        </span>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === i && (
                          <motion.div
                            key="faq-answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4">
                              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full section-padding border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-2xl mx-auto">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
              Can not find what you are looking for? Send us a message and we will
              get back to you.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <Card className="p-8" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  required
                />
                <Textarea
                  label="Message"
                  placeholder="Tell us more about your question or issue..."
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                />
                <Button type="submit" variant="primary" className="w-full">
                  <Mail className="w-4 h-4" />
                  {submitted ? "Message sent!" : "Send Message"}
                </Button>
              </form>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
