"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, Phone, MapPin, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { META } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth scroll to section
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const QUICK_LINKS = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "GitHub Activity", id: "github" },
    { label: "Certifications", id: "certifications" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative bg-[#050505] pt-20 pb-24 overflow-hidden">
      {/* Top Gradient Fade from main bg */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none" />

      {/* Background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[var(--accent-1)]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand (Takes 5 cols on md) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent-1)]/20">
                <span
                  className="text-xl font-black tracking-tighter"
                  style={{ color: "var(--accent-1)" }}
                >
                  ND
                </span>
              </div>
              <h3
                className="text-2xl font-black tracking-tight mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {META.name}
              </h3>
              <p className="text-[var(--accent-1)] font-medium text-sm mb-4">
                B.Tech CSE Student
              </p>
              <p
                className="text-sm leading-relaxed max-w-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Building skills, one project at a time. Passionate about
                software development, AI, and building solutions that matter.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href={META.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-1)]/20 hover:border-[var(--accent-1)]/50 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={META.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-1)]/20 hover:border-[var(--accent-1)]/50 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={`mailto:${META.email}`}
                className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-1)]/20 hover:border-[var(--accent-1)]/50 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Quick Navigation (Takes 3 cols on md) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="text-[var(--text-primary)] font-bold mb-6 tracking-wide uppercase text-sm">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-sm hover:transition-colors inline-flex items-center group"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span className="w-0 h-px bg-[var(--accent-1)] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Summary (Takes 4 cols on md) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <h4
              className="text-2xl font-black mb-4 tracking-tight uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                <Mail className="w-4 h-4 text-[var(--accent-1)] shrink-0" />
                <a
                  href={`mailto:${META.email}`}
                  className="hover:transition-colors truncate"
                  style={{ color: "var(--accent-1)" }}
                >
                  {META.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                <Phone className="w-4 h-4 text-[var(--accent-1)] shrink-0" />
                <span>+91-9121684888</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
                <MapPin className="w-4 h-4 text-[var(--accent-1)] shrink-0" />
                <span>Samastipur, Bihar, India</span>
              </li>
              <li className="mt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Open to Internships
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-center md:text-left"
          style={{ color: "var(--text-secondary)", opacity: 0.6 }}
        >
          <p>
            © {currentYear} {META.displayName}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 order-first md:order-none">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-[var(--accent-1)] fill-current" />{" "}
            by Nayan Deep
          </p>

          <p>Built with Next.js + TypeScript</p>
        </div>
      </div>

      {/* Fixed Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-12 h-12 rounded-full bg-[var(--accent-1)] text-black flex items-center justify-center shadow-[0_0_20px_var(--accent-1)]/40 hover:scale-110 active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
