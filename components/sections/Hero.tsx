"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, ArrowDown, Briefcase } from "lucide-react";
import { META } from "@/data/portfolio";
import { CERTIFICATIONS } from "@/data/certifications";
import AudioTour from "@/components/ui/AudioTour";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { useGSAP } from "@/hooks/useGSAP";
import { useMounted } from "@/hooks/useMounted";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ── Dynamic R3F import (no SSR) ───────────────────────────────
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => null,
});

// ── Typewriter hook ───────────────────────────────────────────
function useTypewriter(texts: string[], speed = 58, pause = 2400) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const current = texts[idx];
    let t: ReturnType<typeof setTimeout>;

    if (!del && char < current.length) {
      t = setTimeout(() => {
        setText(current.slice(0, char + 1));
        setChar((c) => c + 1);
      }, speed);
    } else if (!del && char === current.length) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && char > 0) {
      t = setTimeout(() => {
        setText(current.slice(0, char - 1));
        setChar((c) => c - 1);
      }, speed / 2.5);
    } else if (del && char === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDel(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(t);
  }, [texts, idx, char, del, speed, pause]);

  return text;
}

// ── Count-up hook ─────────────────────────────────────────────
function useCountUp(target: number, dur = 1800, on = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!on) return;
    let start: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, dur, on]);
  return val;
}

// ── Split text into letter spans ──────────────────────────────
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split("").map((ch, i) => (
        <span key={i} className="char inline-block" aria-hidden="true">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

// ── Stat card ─────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
  on,
  isText,
}: {
  value: number | string;
  suffix: string;
  label: string;
  on: boolean;
  isText?: boolean;
}) {
  const num = useCountUp(
    typeof value === "number" ? value : 0,
    1600,
    on && !isText,
  );
  const display = isText ? value : `${num}${suffix}`;
  return (
    <div className="flex flex-col items-center sm:items-start gap-1">
      <span className="text-2xl sm:text-3xl font-black tabular-nums gradient-text-static">
        {display}
      </span>
      <span
        className="text-xs sm:text-sm text-center sm:text-left whitespace-pre-line leading-tight"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Floating tech badges around profile circle ────────────────
const BADGES = [
  { label: "⚛ React", angle: 38 },
  { label: "☁ AWS", angle: 132 },
  { label: "⚙ C/C++", angle: 215 },
  { label: "⚡ Node", angle: 308 },
];

function ProfileCircle() {
  const R = 172; // image circle radius (for sizing container)

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: R * 2, height: R * 2 }}
    >
      {/* Ambient glow blob */}
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: R * 2 + 100,
          height: R * 2 + 100,
          top: -50,
          left: -50,
          background:
            "radial-gradient(circle, var(--glow) 0%, transparent 68%)",
          opacity: 0.3,
        }}
      />

      {/* Outer dashed ring — clockwise */}
      <motion.svg
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        viewBox={`0 0 ${R * 2} ${R * 2}`}
        fill="none"
        style={{ overflow: "visible" }}
      >
        <circle
          cx={R}
          cy={R}
          r={R - 2}
          stroke="var(--accent-1)"
          strokeWidth="1.5"
          strokeDasharray="7 18"
          opacity="0.45"
        />
      </motion.svg>

      {/* Inner dashed ring — counter-clockwise */}
      <motion.svg
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{ width: R * 1.65, height: R * 1.65, overflow: "visible" }}
        viewBox="0 0 140 140"
        fill="none"
      >
        <circle
          cx="70"
          cy="70"
          r="68"
          stroke="var(--accent-2)"
          strokeWidth="1"
          strokeDasharray="4 22"
          opacity="0.30"
        />
      </motion.svg>

      {/* Profile image / monogram */}
      <div
        className="relative flex items-center justify-center rounded-full overflow-hidden z-10"
        style={{
          width: R * 1.42,
          height: R * 1.42,
          background: `linear-gradient(135deg,
            color-mix(in srgb, var(--accent-1) 18%, var(--bg-secondary)),
            color-mix(in srgb, var(--accent-2) 14%, var(--bg-secondary)))`,
          border: "2px solid var(--border)",
          boxShadow: "0 0 48px var(--glow), 0 0 0 1px var(--border)",
        }}
      >
        {/* Hexagonal ND Logo with animations */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            filter: [
              "drop-shadow(0 0 10px rgba(var(--accent-1-rgb, 0, 212, 255), 0.5))",
              "drop-shadow(0 0 24px rgba(var(--accent-1-rgb, 0, 212, 255), 0.9))",
              "drop-shadow(0 0 10px rgba(var(--accent-1-rgb, 0, 212, 255), 0.5))",
            ],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ position: "relative" }}
        >
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              border: "2px dashed rgba(var(--accent-1-rgb, 0, 212, 255), 0.35)",
            }}
          />

          {/* Second counter-rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: -18,
              borderRadius: "50%",
              border: "1px dashed rgba(var(--accent-2-rgb, 123, 47, 190), 0.3)",
            }}
          />

          {/* Hexagonal ND badge */}
          <div
            style={{
              width: 90,
              height: 90,
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background:
                "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
              color: "var(--bg-primary)",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-jetbrains)",
            }}
          >
            ND
          </div>

          {/* Inner glow behind hex */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              background: "var(--accent-1)",
              opacity: 0.12,
              filter: "blur(14px)",
              zIndex: -1,
            }}
          />
        </motion.div>

        {/* Name and role text below logo */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            textAlign: "center",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
              margin: 0,
            }}
          >
            NAYAN
          </p>
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-1)",
              opacity: 0.8,
              marginTop: 2,
              fontFamily: "var(--font-mono)",
              margin: 0,
            }}
          >
            CS · AI · Cloud
          </p>
        </div>

        {/* Inner highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 33% 33%, rgba(255,255,255,0.07), transparent 60%)",
          }}
        />
      </div>

      {/* Floating badges */}
      {BADGES.map(({ label, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = R + 34;
        const x = R + dist * Math.cos(rad);
        const y = R + dist * Math.sin(rad);
        return (
          <motion.div
            key={label}
            aria-hidden="true"
            className="absolute glass rounded-full text-xs font-semibold px-2.5 py-1 whitespace-nowrap pointer-events-none"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%,-50%)",
              color: "var(--accent-1)",
              fontSize: 11,
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2.6 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.55,
            }}
          >
            {label}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────
const TAGLINES = META.roles;

const STATS = [
  { value: 2, suffix: "+", label: "Projects\nShipped", isText: false },
  { value: 15, suffix: "+", label: "Technologies\nLearned", isText: false },
  {
    value: CERTIFICATIONS.length,
    suffix: "+",
    label: "Certifications",
    isText: false,
  },
  { value: "2nd Year", suffix: "", label: "CS Student", isText: true },
] as const;

const fu = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const, delay: d },
});

// ── Hero section ──────────────────────────────────────────────
export default function Hero() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  const tagline = useTypewriter(TAGLINES, 55, 2400);

  // GSAP letter-by-letter name reveal
  useGSAP(
    (gsap) => {
      if (!mounted || reducedMotion) return;
      const chars = heroRef.current?.querySelectorAll(".char");
      if (!chars?.length) return;
      gsap.from(chars, {
        opacity: 0,
        y: 52,
        rotateX: -90,
        transformOrigin: "50% 50% -16px",
        stagger: 0.045,
        duration: 0.75,
        ease: "back.out(1.7)",
        delay: 0.35,
      });
    },
    heroRef,
    [mounted, reducedMotion],
  );

  // Trigger stat count-up when stats row enters viewport
  useEffect(() => {
    if (!mounted) return;
    const el = document.getElementById("hero-stats");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsOn(true);
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* 3D background */}
      {mounted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <HeroScene />
        </div>
      )}

      {/* Radial gradient overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 55% at 75% 50%,
              color-mix(in srgb, var(--accent-1) 7%, transparent), transparent 70%),
            radial-gradient(ellipse 40% 40% at 25% 50%,
              color-mix(in srgb, var(--accent-2) 5%, transparent), transparent 65%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* ── LEFT: Text ───────────────────────────────── */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            {/* Open to internship badge */}
            <motion.div
              {...fu(0.1)}
              className="flex justify-center lg:justify-start"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium glass"
                style={{ color: "#4ade80" }}
              >
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Open to Internship Opportunities
                <span
                  className="hidden sm:flex items-center gap-1 ml-1 pl-2 text-xs"
                  style={{
                    borderLeft: "1px solid rgba(74,222,128,0.3)",
                    color: "var(--text-secondary)",
                  }}
                >
                  SDE · AI · Cloud · Data
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <div>
              <p
                className="text-sm font-medium tracking-[0.22em] uppercase mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Hi, I&apos;m
              </p>
              <h1
                className="font-black leading-[1.05] tracking-tight"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                  color: "var(--text-primary)",
                }}
              >
                <SplitText text="Nayan " />
                <SplitText text="Deep" className="gradient-text-static" />
              </h1>
            </div>

            {/* Role badge */}
            <motion.div
              {...fu(0.8)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium glass"
                style={{ color: "var(--accent-1)" }}
              >
                <Briefcase size={14} />
                B.Tech Computer Science
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                @ Desh Bhagat University
              </span>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              {...fu(1.0)}
              className="h-8 flex items-center justify-center lg:justify-start"
            >
              <p
                className="text-base sm:text-lg font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--accent-1)" }}>&gt; </span>
                {tagline}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ color: "var(--accent-1)" }}
                >
                  |
                </motion.span>
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              {...fu(1.2)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <a
                href={META.resumeUrl}
                download
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2"
                style={{
                  background: "var(--gradient-brand)",
                  color: "#fff",
                  boxShadow: "0 0 20px var(--glow)",
                }}
              >
                <Download size={16} strokeWidth={2.5} />
                Download Resume
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold glass transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2"
                style={{ color: "var(--text-primary)" }}
              >
                <ArrowDown size={16} strokeWidth={2.5} />
                View My Work
              </button>
              <div className="flex items-center gap-2">
                {[
                  {
                    href: "https://github.com/nayan-codes15",
                    Icon: GithubIcon,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/nayan-deep-460119279",
                    Icon: LinkedinIcon,
                    label: "LinkedIn",
                  },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-full glass transition-all duration-200 hover:scale-110 focus-visible:outline-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Audio Tour Trigger */}
              <div className="flex items-center mt-2 lg:mt-0 lg:ml-2">
                <AudioTour />
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Profile ────────────────────────────── */}
          <motion.div
            {...fu(0.4)}
            className="flex justify-center order-1 lg:order-2"
          >
            <ProfileCircle />
          </motion.div>
        </div>

        {/* Stats row */}
        <div
          id="hero-stats"
          className="mt-16 pt-10 flex flex-wrap items-start justify-center lg:justify-start gap-8 sm:gap-14"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {STATS.map((s) => (
            <StatCard
              key={s.label}
              value={s.value as number | string}
              suffix={s.suffix}
              label={s.label}
              on={statsOn}
              isText={s.isText}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <span
            className="text-xs tracking-[0.28em] uppercase"
            style={{ color: "var(--text-secondary)", opacity: 0.5 }}
          >
            Scroll
          </span>
          <div
            className="w-px h-7 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-1), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
