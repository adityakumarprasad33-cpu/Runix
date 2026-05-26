"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function BetaApplyPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    osExperience: "",
    hardware: "",
    testingAvailability: "",
    notes: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "beta" }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full text-center"
        >
          <Card className="p-10" hover={false}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                <CheckCircle2 className="w-8 h-8 text-[var(--success)]" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                Application Received
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Thank you for applying to the Runix beta program. We will review
                your application and get back to you.
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <section className="w-full section-padding">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Beta Tester <span className="text-gradient">Application</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)]">
                Help us test Runix and shape the future of the OS.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <Card className="p-8" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <Select
                  label="OS Experience"
                  value={form.osExperience}
                  onChange={(e) =>
                    setForm({ ...form, osExperience: e.target.value })
                  }
                  options={[
                    { value: "", label: "Select your experience level..." },
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                    { value: "expert", label: "Expert (kernel/driver dev)" },
                  ]}
                />

                <Textarea
                  label="Your Hardware Setup"
                  placeholder="Describe your system: CPU, RAM, GPU, storage, any specialized hardware..."
                  rows={3}
                  value={form.hardware}
                  onChange={(e) =>
                    setForm({ ...form, hardware: e.target.value })
                  }
                  required
                />

                <Select
                  label="Testing Availability"
                  value={form.testingAvailability}
                  onChange={(e) =>
                    setForm({ ...form, testingAvailability: e.target.value })
                  }
                  options={[
                    { value: "", label: "Select availability..." },
                    { value: "few-hours", label: "A few hours per week" },
                    { value: "part-time", label: "Part-time (10-20 hrs/week)" },
                    { value: "full-time", label: "Full-time (20+ hrs/week)" },
                  ]}
                />

                <Textarea
                  label="Additional Notes"
                  placeholder="Anything else you would like us to know..."
                  rows={3}
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[var(--error)] bg-red-50 dark:bg-red-900/10 rounded-lg px-3 py-2"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  loading={loading}
                  size="lg"
                >
                  Submit Application
                </Button>
              </form>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
