"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Mail,
  Phone,
  Search,
  Briefcase,
  Code2,
  Database,
  Brain,
  Cloud,
  Terminal,
  GitBranch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Shared animation helpers ──────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
});

// ── Quick Info ────────────────────────────────────────────────
interface InfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const INFO_ITEMS: InfoItem[] = [
  { icon: MapPin, label: "Location", value: "Samastipur, Bihar, India" },
  { icon: GraduationCap, label: "Degree", value: "B.Tech CSE · 2nd Year" },
  {
    icon: Mail,
    label: "Email",
    value: "nayandeep1412@gmail.com",
    href: "mailto:nayandeep1412@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9121684888",
    href: "tel:+919121684888",
  },
  { icon: Search, label: "Status", value: "Seeking Internship" },
  { icon: Briefcase, label: "Type", value: "Remote / Hybrid / On-site" },
];

function InfoCard({ item, index }: { item: InfoItem; index: number }) {
  const Icon = item.icon;
  const inner = (
    <div
      className="glass flex items-start gap-3 rounded-xl p-3.5 transition-all duration-300 hover:border-[var(--accent-1)]"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{
          width: 36,
          height: 36,
          background: "color-mix(in srgb, var(--accent-1) 12%, transparent)",
        }}
      >
        <Icon
          size={16}
          style={{ color: "var(--accent-1)" }}
          strokeWidth={1.8}
        />
      </div>
      <div className="min-w-0">
        <p
          className="text-xs font-medium mb-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {item.label}
        </p>
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {item.value}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div key={item.label} {...slideRight(index * 0.07)}>
      {item.href ? (
        <a href={item.href} data-cursor="link" className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}

// ── Currently Learning cards ──────────────────────────────────
interface LearnItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  color?: string;
}

const LEARN_ITEMS: LearnItem[] = [
  {
    icon: Code2,
    title: "Data Structures & Algorithms",
    desc: "Building a strong problem-solving foundation",
  },
  { icon: Database, title: "DBMS", desc: "Learning database design and SQL" },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    desc: "Exploring ML concepts and applications",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    desc: "AWS fundamentals and cloud architecture",
  },
  {
    icon: Terminal,
    title: "SQL",
    desc: "Structured query language and databases",
  },
  {
    icon: GitBranch,
    title: "Git & GitHub",
    desc: "Version control and collaboration workflows",
  },
];

function LearnCard({ item, index }: { item: LearnItem; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div {...fadeUp(0.1 + index * 0.06)}>
      <div
        className="glass rounded-xl p-4 h-full group card-hover"
        style={{ borderLeft: "3px solid var(--accent-1)" }}
        data-cursor="card"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5"
            style={{
              width: 32,
              height: 32,
              background:
                "color-mix(in srgb, var(--accent-1) 15%, transparent)",
            }}
          >
            <Icon
              size={15}
              style={{ color: "var(--accent-1)" }}
              strokeWidth={1.8}
            />
          </div>
          <div>
            <h4
              className="text-sm font-semibold mb-1 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {item.title}
            </h4>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section heading ───────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
      style={{
        background: "color-mix(in srgb, var(--accent-1) 12%, transparent)",
        color: "var(--accent-1)",
        border:
          "1px solid color-mix(in srgb, var(--accent-1) 25%, transparent)",
      }}
    >
      {text}
    </span>
  );
}

// ── About Section ─────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-start">
          {/* ── LEFT: Summary ─────────────────────────────── */}
          <div className="space-y-8">
            {/* Heading */}
            <motion.div {...fadeUp(0)} className="space-y-3">
              <SectionLabel text="About Me" />
              <h2
                className="text-3xl sm:text-4xl font-black leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Turning curiosity{" "}
                <span className="gradient-text-static">into capability</span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.div {...fadeUp(0.1)} className="space-y-4">
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Nayan Kumar is a Computer Science student currently pursuing{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  B.Tech at Desh Bhagat University
                </strong>
                , with a foundation built through a{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  Diploma in CSE from NIMS University, Jaipur
                </strong>
                .
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                He is passionate about{" "}
                <strong style={{ color: "var(--accent-1)" }}>
                  Software Development
                </strong>
                ,{" "}
                <strong style={{ color: "var(--accent-1)" }}>
                  Artificial Intelligence
                </strong>
                ,{" "}
                <strong style={{ color: "var(--accent-1)" }}>
                  Cloud Computing
                </strong>
                ,{" "}
                <strong style={{ color: "var(--accent-1)" }}>
                  Data Analytics
                </strong>
                , and{" "}
                <strong style={{ color: "var(--accent-1)" }}>
                  Database Systems
                </strong>{" "}
                — and is actively building skills through hands-on projects and
                certifications.
              </p>
            </motion.div>

            {/* Quick info grid */}
            <div>
              <motion.p
                {...fadeUp(0.15)}
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                Quick Info
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INFO_ITEMS.map((item, i) => (
                  <InfoCard key={item.label} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Currently Learning ──────────────────── */}
          <div className="space-y-6">
            <motion.div {...fadeUp(0.05)} className="space-y-1">
              <SectionLabel text="Currently Learning" />
              <h3
                className="text-xl sm:text-2xl font-bold mt-3"
                style={{ color: "var(--text-primary)" }}
              >
                My active focus areas right now
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Growing through consistent learning and real-world application.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEARN_ITEMS.map((item, i) => (
                <LearnCard key={item.title} item={item} index={i} />
              ))}
            </div>

            {/* Diploma callout */}
            <motion.div
              {...fadeUp(0.5)}
              className="glass rounded-xl p-4"
              style={{ borderLeft: "3px solid var(--accent-2)" }}
            >
              <div className="flex items-start gap-3">
                <GraduationCap
                  size={20}
                  style={{
                    color: "var(--accent-2)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                  strokeWidth={1.8}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Prior Foundation
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Diploma in Computer Science Engineering —{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      NIMS University, Jaipur
                    </strong>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
