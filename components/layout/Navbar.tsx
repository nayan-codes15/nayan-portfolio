"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Download, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

// Brand icon SVGs (not in lucide-react)
const GithubIcon = ({ size = 20 }: { size?: number }) => (
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

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
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
import { useMounted } from "@/hooks/useMounted";
import { useScrollY } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntro } from "@/hooks/useIntro";
import { META } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// ── Nav link definitions ──────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  external?: string; // if set, opens this URL instead of scrolling
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "current-focus", label: "Skills" },
  { id: "projects", label: "Projects" },
  {
    id: "github",
    label: "GitHub",
    external: "https://github.com/nayan-codes15",
  },
  { id: "certifications", label: "Certs" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.filter((n) => !n.external).map((n) => n.id);

const SOCIAL_LINKS = [
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
  { href: `mailto:${META.email}`, Icon: Mail, label: "Email" },
];

// ── Framer Motion variants ────────────────────────────────────
const MOBILE_MENU = {
  hidden: { opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 36px)" },
  visible: {
    opacity: 1,
    clipPath: "circle(200% at calc(100% - 44px) 36px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    clipPath: "circle(0% at calc(100% - 44px) 36px)",
    transition: { duration: 0.38, ease: [0.7, 0, 0.84, 0] as const },
  },
};

const LINK_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};

const LINK_ITEM: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const SOCIAL_ITEM = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.07,
      type: "spring" as const,
      stiffness: 280,
      damping: 24,
    },
  },
});

// ── ND Logo ───────────────────────────────────────────────────
function Logo({
  onClick,
  scrolled,
}: {
  onClick?: () => void;
  scrolled?: boolean;
}) {
  return (
    <Link href="/" aria-label="Nayan Deep — Home" onClick={onClick}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative flex items-center gap-2.5 group cursor-pointer"
      >
        {/* Hexagonal monogram */}
        <div
          className="relative flex items-center justify-center font-black"
          style={{
            width: 38,
            height: 38,
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            background:
              "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
            fontSize: 14,
            color: "var(--bg-primary)",
            letterSpacing: "-0.02em",
            transition: "all 0.3s ease",
          }}
        >
          ND
        </div>

        {/* Glow ring behind hex */}
        <motion.div
          className="absolute"
          style={{
            width: 38,
            height: 38,
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            background: "var(--accent-1)",
            opacity: 0,
            filter: "blur(8px)",
            zIndex: -1,
          }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* Name text */}
        <div
          className={`flex-col leading-none transition-all duration-300 ${scrolled ? "hidden" : "hidden sm:flex"}`}
        >
          <span
            className="font-bold text-sm tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Nayan Deep
          </span>
          <span
            className="text-[10px] font-medium tracking-widest uppercase"
            style={{ color: "var(--accent-1)" }}
          >
            Portfolio
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

// ── Open-to-work dot ──────────────────────────────────────────
function OTWDot() {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      aria-label="Available for internships"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold pointer-events-none z-50"
            style={{
              background: "var(--bg-secondary)",
              color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.3)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            Available for Internships
            <span
              className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{ borderBottomColor: "var(--bg-secondary)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Desktop nav link ──────────────────────────────────────────
function DeskLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate: (item: NavItem) => void;
}) {
  return (
    <button
      onClick={() => onNavigate(item)}
      data-cursor="link"
      aria-label={item.label}
      className={cn(
        "relative text-xs font-medium px-1 py-1 transition-colors duration-200 focus-visible:outline-2 rounded",
        active
          ? "text-[var(--accent-1)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
      )}
    >
      <span className="flex items-center gap-1">
        {item.label}
        {item.external && <ExternalLink size={10} />}
      </span>
      {active && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
          style={{ background: "var(--accent-1)" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

// ── Hamburger icon ────────────────────────────────────────────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-5">
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute top-0 left-0 w-5 h-0.5 rounded-full block"
        style={{ background: "var(--text-primary)" }}
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-2 left-0 w-5 h-0.5 rounded-full block"
        style={{ background: "var(--text-primary)" }}
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute top-4 left-0 w-5 h-0.5 rounded-full block"
        style={{ background: "var(--text-primary)" }}
      />
    </div>
  );
}

// ── Mobile full-screen menu ───────────────────────────────────
function MobileMenu({
  isOpen,
  onClose,
  active,
  onNavigate,
  replayIntro,
}: {
  isOpen: boolean;
  onClose: () => void;
  active: string;
  onNavigate: (item: NavItem) => void;
  replayIntro: () => void;
}) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={MOBILE_MENU}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9990] flex flex-col px-6 pt-24 pb-12"
          style={{ background: "var(--bg-primary)" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            data-cursor="link"
            className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full glass focus-visible:outline-2"
          >
            <X size={20} style={{ color: "var(--text-primary)" }} />
          </button>

          <div
            className="flex items-center gap-3 mb-8 pb-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {/* Same ND hex logo */}
            <div
              style={{
                width: 44,
                height: 44,
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                background:
                  "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
                color: "var(--bg-primary)",
              }}
            >
              ND
            </div>

            <div className="flex flex-col">
              <span
                className="font-bold text-base"
                style={{ color: "var(--text-primary)" }}
              >
                Nayan Deep
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--accent-1)" }}
              >
                CS Student · Portfolio
              </span>
            </div>
          </div>

          {/* Nav links */}
          <motion.nav
            variants={LINK_CONTAINER}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <motion.li key={item.id} variants={LINK_ITEM}>
                  <button
                    onClick={() => onNavigate(item)}
                    data-cursor="link"
                    className="w-full text-left py-3 text-3xl font-black transition-colors duration-150 focus-visible:outline-2 flex items-center gap-3 group"
                    style={{
                      color:
                        active === item.id
                          ? "var(--accent-1)"
                          : "var(--text-primary)",
                    }}
                  >
                    <span
                      className="text-sm font-mono"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {String(NAV_ITEMS.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                      {item.external && <ExternalLink size={18} />}
                    </span>
                  </button>
                </motion.li>
              ))}

              <motion.li variants={LINK_ITEM}>
                <button
                  onClick={() => {
                    onClose();
                    replayIntro();
                  }}
                  data-cursor="link"
                  className="w-full text-left py-3 text-3xl font-black transition-colors duration-150 focus-visible:outline-2 flex items-center gap-3 group"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span
                    className="text-sm font-mono"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    --
                  </span>
                  <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                    Replay Intro
                  </span>
                </button>
              </motion.li>
            </ul>
          </motion.nav>

          {/* Bottom: Resume + Theme hint + Socials */}
          <div className="space-y-6">
            {/* Theme hint */}
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              🎨 Use the button in the bottom-right to switch themes
            </p>

            {/* Resume */}
            <a
              href={META.resumeUrl}
              download
              data-cursor="link"
              className="flex items-center gap-2 w-full justify-center rounded-full py-3 px-6 text-sm font-semibold"
              style={{ background: "var(--gradient-brand)", color: "#fff" }}
            >
              <Download size={16} />
              Download Resume
            </a>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-4">
              {SOCIAL_LINKS.map(({ href, Icon, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="link"
                  {...SOCIAL_ITEM(i)}
                  className="flex items-center justify-center w-11 h-11 rounded-full glass transition-all duration-200 hover:scale-110 focus-visible:outline-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Navbar ────────────────────────────────────────────────────
export function Navbar() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const scrollY = useScrollY();
  const activeSection = useActiveSection(SECTION_IDS);
  const { replayIntro } = useIntro();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const scrolled = scrollY > 40;

  const navigate = useCallback(
    (item: NavItem) => {
      setMenuOpen(false);
      if (item.external) {
        window.open(item.external, "_blank", "noopener,noreferrer");
        return;
      }
      const el = document.getElementById(item.id);
      if (el)
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  if (!mounted) return null;

  return (
    <>
      <ScrollProgress />

      <header
        ref={navRef}
        className="fixed top-0 inset-x-0 z-[9998] transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: logo + OTW dot */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Logo onClick={scrollToTop} scrolled={scrolled} />
            <OTWDot />
          </div>

          {/* Center: desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <DeskLink
                key={item.id}
                item={item}
                active={activeSection === item.id}
                onNavigate={navigate}
              />
            ))}
          </nav>

          {/* Right: resume + replay + hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => replayIntro()}
              data-cursor="link"
              className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold glass transition-all duration-200 hover:opacity-90 focus-visible:outline-2"
              style={{
                color: "var(--text-primary)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Replay Intro
            </button>

            {/* Resume button — desktop only */}
            <a
              href={META.resumeUrl}
              download
              data-cursor="link"
              aria-label="Download Resume"
              className="hidden md:flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold glass transition-all duration-200 hover:scale-105 focus-visible:outline-2"
              style={{
                color: "var(--accent-1)",
                border: "1px solid var(--accent-1)",
              }}
            >
              <Download size={13} />
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              data-cursor="link"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full glass focus-visible:outline-2"
            >
              <HamburgerIcon isOpen={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={activeSection}
        onNavigate={navigate}
        replayIntro={replayIntro}
      />
    </>
  );
}
