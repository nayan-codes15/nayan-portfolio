"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { EDUCATION_DATA } from "@/data/education";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current && sectionRef.current) {
      // Create the drawing animation for the center line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1, // Smooth scrubbing
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top center" },
      );

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section-py relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 gradient-text-static"
          >
            Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[var(--text-secondary)]"
          >
            My academic journey
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--bg-card)] -translate-x-1/2" />

          {/* Animated Highlight Line */}
          <div
            ref={lineRef}
            className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-1)] to-[var(--accent-2)] -translate-x-1/2"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-12 md:space-y-0 relative z-10">
            {EDUCATION_DATA.map((entry, index) => {
              const isEven = index % 2 === 0;
              const Icon = entry.icon;

              return (
                <div
                  key={entry.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} mb-12 md:mb-24 last:mb-0`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border-4 border-black flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20"
                  >
                    <motion.div
                      className={`w-full h-full rounded-full flex items-center justify-center ${entry.highlight ? "bg-[var(--accent-1)]" : "bg-[var(--bg-card)]"}`}
                      whileInView={
                        entry.highlight
                          ? {
                              boxShadow: [
                                "0 0 0px var(--accent-1)",
                                "0 0 20px var(--accent-1)",
                                "0 0 0px var(--accent-1)",
                              ],
                            }
                          : {}
                      }
                      transition={
                        entry.highlight ? { duration: 2, repeat: Infinity } : {}
                      }
                    >
                      <Icon
                        className={`w-5 h-5 ${entry.highlight ? "text-black" : "text-[var(--text-secondary)]"}`}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring", damping: 25, stiffness: 100 }}
                    className={`w-full pl-20 pr-4 md:px-0 md:w-1/2 ${isEven ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"}`}
                  >
                    <div
                      className={`glass-panel p-6 sm:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${entry.highlight ? "border-[var(--accent-1)]/50 shadow-[0_0_30px_color-mix(in_srgb,var(--accent-1)_15%,transparent)]" : "border-[var(--border)] hover:border-white/20"}`}
                    >
                      {/* Glow effect for highlighted entry */}
                      {entry.highlight && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-1)]/10 to-transparent pointer-events-none" />
                      )}

                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
                          style={{
                            backgroundColor: "rgba(var(--bg-primary-rgb), 0.1)",
                            borderColor: "var(--border)",
                            border: "1px solid",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {entry.period || entry.year}
                        </span>
                        {entry.badge && (
                          <span className="px-3 py-1 bg-[var(--accent-1)]/20 text-[var(--accent-1)] border border-[var(--accent-1)]/30 rounded-full text-xs font-bold tracking-wider uppercase">
                            {entry.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1">
                        {entry.degree || entry.level}
                      </h3>
                      <h4 className="text-[var(--text-secondary)] font-medium mb-4 text-sm sm:text-base">
                        {entry.institution}
                      </h4>

                      <div className="mb-4 inline-flex items-center text-sm font-medium text-[var(--text-secondary)]">
                        {entry.statusLabel}
                      </div>

                      {(entry.percentage || entry.cgpa) && (
                        <div className="flex gap-4 mb-5 p-3 rounded-lg bg-[rgba(var(--bg-primary-rgb),0.4)] border border-[var(--border)]">
                          {entry.percentage && (
                            <div>
                              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                                Percentage
                              </div>
                              <div className="font-bold text-[var(--text-primary)]">
                                {entry.percentage}
                              </div>
                            </div>
                          )}
                          {entry.cgpa && (
                            <div>
                              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                                CGPA
                              </div>
                              <div className="font-bold text-[var(--text-primary)]">
                                {entry.cgpa}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <ul className="space-y-2 mt-4 border-t border-[var(--border)] pt-4">
                        {entry.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm sm:text-base text-[var(--text-secondary)]"
                          >
                            <span className="text-[var(--accent-1)] mr-2 mt-1.5 size-1.5 rounded-full bg-[var(--accent-1)] shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
