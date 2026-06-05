"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { META } from "@/data/portfolio";

type FormData = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  _honeypot: string; // spam protection
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const onSubmit = async (data: FormData) => {
    // Spam protection
    if (data._honeypot) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // NOTE: Replace these with your actual EmailJS credentials
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_placeholder";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_placeholder";

      if (serviceId === "service_placeholder") {
        // Mock successful submission for demo if keys aren't set
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          company: data.company || "Not provided",
          subject: data.subject,
          message: data.message,
          to_name: "Nayan Kumar",
        },
        publicKey,
      );

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Failed to send email:", err);
      setErrorMsg("Failed to send message. Please try emailing me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CONTACT_CARDS = [
    {
      id: "email",
      label: "Email",
      value: META.email,
      icon: Mail,
      link: `mailto:${META.email}`,
    },
    {
      id: "phone",
      label: "Phone",
      value: "+91-9121684888",
      icon: Phone,
      link: "tel:+919121684888",
    },
    {
      id: "location",
      label: "Location",
      value: META.location,
      icon: MapPin,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: META.socials.linkedin.replace("https://", ""),
      icon: FaLinkedin,
      link: META.socials.linkedin,
    },
    {
      id: "github",
      label: "GitHub",
      value: META.socials.github.replace("https://", ""),
      icon: FaGithub,
      link: META.socials.github,
    },
  ];

  return (
    <section id="contact" className="section-py relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--accent-1)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--accent-2)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 gradient-text-static"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[var(--text-secondary)]"
          >
            Reach out for internships, product collaborations, or software
            development opportunities.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT COLUMN: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2">
                Let&apos;s Connect{" "}
                <Sparkles className="w-5 h-5 text-[var(--accent-1)]" />
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-md">
                I am actively looking for internship opportunities in Software
                Development, AI, Cloud Computing, and Data Analytics. Feel free
                to reach out — I&apos;d love to discuss how I can contribute to
                your team.
              </p>
            </div>

            {/* Availability Card */}
            <div className="glass-panel p-6 rounded-2xl border border-[var(--accent-1)]/30 bg-[var(--accent-1)]/5 shadow-[0_0_30px_rgba(74,222,128,0.05)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <h4 className="font-bold text-green-400">
                  Available for Internship
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />{" "}
                  Immediate joining
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />{" "}
                  Remote / Hybrid / On-site
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />{" "}
                  Duration: 3-6 months preferred
                </li>
              </ul>
            </div>

            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              {CONTACT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-4 rounded-xl border hover:transition-all group"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-[rgba(var(--bg-primary-rgb),0.4)] flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent-1)]/50 group-hover:text-[var(--accent-1)] transition-colors shrink-0">
                      <card.icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">
                        {card.label}
                      </p>
                      {card.link ? (
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-1)] transition-colors truncate block"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {card.value}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(card.id, card.value)}
                    className="p-2 rounded-lg hover:bg-[rgba(var(--bg-primary-rgb),0.4)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedId === card.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] relative"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-[rgba(var(--bg-primary-rgb),0.95)] rounded-3xl backdrop-blur-md"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Thank you for reaching out. I&apos;ll get back to you within
                  24 hours.
                </p>
              </motion.div>
            ) : null}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {/* Honeypot field (hidden from users, catches bots) */}
              <input
                type="text"
                {...register("_honeypot")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                    Full Name <span className="text-[var(--accent-1)]">*</span>
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="John Doe"
                    className={`w-full bg-[rgba(var(--bg-primary-rgb),0.4)] border rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]/50 transition-all ${errors.name ? "border-red-500/50 focus:border-red-500" : "border-[var(--border)] focus:border-[var(--accent-1)]"}`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 mt-1.5 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                    Email Address{" "}
                    <span className="text-[var(--accent-1)]">*</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="your.email@example.com"
                    className={`w-full bg-[rgba(var(--bg-primary-rgb),0.4)] border rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]/50 transition-all ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-[var(--border)] focus:border-[var(--accent-1)]"}`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 mt-1.5 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  Company / Organization{" "}
                  <span className="text-gray-600 normal-case tracking-normal">
                    (Optional)
                  </span>
                </label>
                <input
                  {...register("company")}
                  type="text"
                  placeholder="Tech Corp Inc."
                  className="w-full bg-[rgba(var(--bg-primary-rgb),0.4)] border border-[var(--border)] focus:border-[var(--accent-1)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]/50 transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  Subject <span className="text-[var(--accent-1)]">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("subject", {
                      required: "Please select a subject",
                    })}
                    className={`w-full bg-[rgba(var(--bg-primary-rgb),0.4)] border rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]/50 transition-all ${errors.subject ? "border-red-500/50" : "border-[var(--border)] focus:border-[var(--accent-1)]"}`}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Select a subject
                    </option>
                    <option value="Internship Opportunity">
                      Internship Opportunity
                    </option>
                    <option value="Project Collaboration">
                      Project Collaboration
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-[var(--text-secondary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
                {errors.subject && (
                  <span className="text-xs text-red-400 mt-1.5 block">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  Message <span className="text-[var(--accent-1)]">*</span>
                </label>
                <textarea
                  {...register("message", {
                    required: "Message cannot be empty",
                    minLength: { value: 10, message: "Message is too short" },
                  })}
                  placeholder="Hello Nayan, I am reaching out because..."
                  rows={5}
                  className={`w-full bg-[rgba(var(--bg-primary-rgb),0.4)] border rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]/50 transition-all resize-none custom-scrollbar ${errors.message ? "border-red-500/50 focus:border-red-500" : "border-[var(--border)] focus:border-[var(--accent-1)]"}`}
                />
                {errors.message && (
                  <span className="text-xs text-red-400 mt-1.5 block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Error Message Display */}
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--accent-1)] text-black font-bold rounded-xl px-4 py-4 flex items-center justify-center gap-2 hover:bg-[var(--accent-1)]/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-[0_0_20px_var(--accent-1)]/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 ml-1" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[var(--text-muted)] mt-2">
                I typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
