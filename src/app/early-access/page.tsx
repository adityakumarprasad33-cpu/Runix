"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, ArrowRight, Package, Users, MessageSquare, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const steps = ["Personal Info", "Experience", "Motivation", "Review"];

const featureIcons = [Package, Users, MessageSquare, Award];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function EarlyAccessPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: "intermediate",
    deviceDetails: "",
    reason: "",
    interestArea: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return form.name.length > 0 && form.email.length > 0;
      case 1:
        return form.experience.length > 0 && form.deviceDetails.length > 0;
      case 2:
        return form.reason.length > 0 && form.interestArea.length > 0;
      default:
        return true;
    }
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      goNext();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
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
              <CheckCircle2 className="w-8 h-8 text-[var(--success)]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                Application Submitted
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                Thank you for your interest in Runix Early Access. We review
                applications on a rolling basis and will be in touch.
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                In the meantime, join our community to stay updated.
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
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium mb-4 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
              >
                Limited Slots Available
              </motion.span>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Runix v1.0{" "}
                <span className="text-gradient">Early Access</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)]">
                Be among the first to experience the future of operating systems.
                Apply for early access and help shape Runix.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {[
              {
                title: "Early Builds",
                desc: "Access to the latest development builds before anyone else.",
              },
              {
                title: "Private Community",
                desc: "Direct access to the development team and private channels.",
              },
              {
                title: "Direct Feedback",
                desc: "Your input directly influences the direction of Runix.",
              },
              {
                title: "Hall of Fame",
                desc: "Permanent recognition as an early supporter of Runix.",
              },
            ].map((item, i) => {
              const Icon = featureIcons[i];
              return (
                <SectionReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group h-full"
                  >
                    <Card className="p-5 text-center h-full relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent rounded-xl" />
                      </div>
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                          transition={{ duration: 0.4 }}
                          className="w-10 h-10 rounded-lg bg-[var(--primary-light)] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                        >
                          <Icon className="w-5 h-5 text-[var(--primary)]" />
                        </motion.div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {item.desc}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-0 mb-10 max-w-2xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={
                      i <= step
                        ? {
                            scale: [1, 1.15, 1],
                            boxShadow: i === step
                              ? [
                                  "0 0 0 0 rgba(79,70,229,0.4)",
                                  "0 0 0 8px rgba(79,70,229,0)",
                                ]
                              : "0 0 0 0 rgba(79,70,229,0)",
                          }
                        : {}
                    }
                    transition={
                      i === step
                        ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        : {}
                    }
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i <= step
                        ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25"
                        : "bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]"
                    }`}
                  >
                    {i < step ? (
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    ) : (
                      i + 1
                    )}
                  </motion.div>
                  <motion.span
                    animate={{ color: i <= step ? "var(--text-primary)" : "var(--text-muted)" }}
                    className={`text-[11px] font-medium hidden sm:block transition-colors ${
                      i <= step ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {s}
                  </motion.span>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    animate={{ backgroundColor: i < step ? "var(--primary)" : "var(--border)" }}
                    className="h-0.5 flex-1 mx-2 mt-[-1.25rem] rounded-full"
                    style={{ backgroundColor: i < step ? "var(--primary)" : "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>

          <SectionReveal delay={0.2}>
            <Card className="p-8 max-w-2xl mx-auto relative overflow-hidden" hover={false}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-5"
                  >
                    {step === 0 && (
                      <>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          Personal Information
                        </h3>
                        <Input
                          label="Full Name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                        />
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          Experience & Device Details
                        </h3>
                        <Select
                          label="Experience Level"
                          value={form.experience}
                          onChange={(e) =>
                            updateField("experience", e.target.value)
                          }
                          options={[
                            { value: "beginner", label: "Beginner" },
                            { value: "intermediate", label: "Intermediate" },
                            { value: "advanced", label: "Advanced" },
                            { value: "expert", label: "Expert" },
                          ]}
                        />
                        <Input
                          label="Device Specifications"
                          placeholder="CPU, RAM, GPU, storage (e.g., Intel i7, 16GB, RTX 3060)"
                          value={form.deviceDetails}
                          onChange={(e) =>
                            updateField("deviceDetails", e.target.value)
                          }
                          required
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          Motivation & Interest
                        </h3>
                        <Textarea
                          label="Why do you want early access?"
                          placeholder="Tell us why you are interested in Runix and what you hope to do with it..."
                          rows={4}
                          value={form.reason}
                          onChange={(e) => updateField("reason", e.target.value)}
                          required
                        />
                        <Input
                          label="Area of Interest"
                          placeholder="e.g., Kernel development, UI/UX, testing, documentation"
                          value={form.interestArea}
                          onChange={(e) =>
                            updateField("interestArea", e.target.value)
                          }
                          required
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          Review Your Application
                        </h3>
                        <div className="space-y-3 p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                          {[
                            { label: "Name", value: form.name },
                            { label: "Email", value: form.email },
                            { label: "Experience", value: form.experience },
                            {
                              label: "Device",
                              value: form.deviceDetails,
                            },
                            { label: "Reason", value: form.reason },
                            {
                              label: "Interest",
                              value: form.interestArea,
                            },
                          ].map((item, idx) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 text-sm"
                            >
                              <span className="text-[var(--text-muted)] w-20 shrink-0">
                                {item.label}
                              </span>
                              <span className="text-[var(--text-primary)] font-medium">
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-[var(--error)] bg-red-50 dark:bg-red-900/10 rounded-lg px-3 py-2"
                          >
                            {error}
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={goBack}
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!canProceed()}
                    loading={step === steps.length - 1 && loading}
                  >
                    {step < steps.length - 1 ? (
                      <>
                        Continue <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
