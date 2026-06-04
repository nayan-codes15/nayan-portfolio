"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { JOURNEY_MILESTONES } from "@/data/journey";

export default function LearningJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="journey" className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 gradient-text-static"
          >
            Learning Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[var(--text-secondary)]"
          >
            My growth as a developer — step by step
          </motion.p>
        </div>

        {/* Desktop Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex items-center justify-end gap-2 text-[var(--accent-3)] mb-4 pr-4"
        >
          <span className="text-sm font-semibold uppercase tracking-widest">
            Scroll to explore
          </span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </motion.div>

        {/* Timeline Container */}
        <div
          ref={containerRef}
          className="relative md:overflow-x-auto md:snap-x md:snap-mandatory custom-scrollbar md:pb-12"
        >
          <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 md:min-w-max md:px-4">
            {/* The Path/Road Line */}
            {/* Mobile Vertical Line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-[var(--bg-card)] md:hidden" />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-[var(--accent-3)] md:hidden origin-top shadow-[0_0_15px_var(--accent-3)]"
            />

            {/* Desktop Horizontal Line */}
            <div className="absolute top-[39px] left-0 right-0 h-[2px] bg-[var(--bg-card)] hidden md:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-[39px] left-0 right-0 h-[2px] bg-[var(--accent-3)] hidden md:block origin-left shadow-[0_0_15px_var(--accent-3)]"
            />

            {/* Milestones */}
            {JOURNEY_MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                  delay: index * 0.15,
                }}
                className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-8 md:w-[300px] md:shrink-0 md:snap-start group"
              >
                {/* Node / Checkpoint */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  <div
                    className={`w-14 h-14 rounded-full border-4 border-black flex items-center justify-center text-2xl bg-[#0a0a0a] transition-all duration-300 ${milestone.isCurrent ? "shadow-[0_0_20px_var(--accent-3)] ring-2 ring-[var(--accent-3)]" : "group-hover:border-[var(--accent-3)]"}`}
                  >
                    {milestone.isCurrent ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {milestone.icon}
                      </motion.div>
                    ) : (
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        {milestone.icon}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 md:w-full md:text-center glass-panel p-5 sm:p-6 rounded-2xl border transition-colors ${milestone.isCurrent ? "border-[var(--accent-3)]/50 bg-[var(--accent-3)]/5" : "border-[var(--border)] group-hover:border-[var(--accent-3)]/30"}`}
                >
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 border ${milestone.isCurrent ? "bg-[var(--accent-3)]/20 text-[var(--accent-3)] border-[var(--accent-3)]/50" : ""}`}
                    style={
                      !milestone.isCurrent
                        ? {
                            backgroundColor:
                              "rgba(var(--bg-primary-rgb), 0.05)",
                            color: "var(--text-secondary)",
                            borderColor: "var(--border)",
                          }
                        : {}
                    }
                  >
                    {milestone.year}
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 ${milestone.isCurrent ? "text-[var(--text-primary)]" : "text-[var(--text-primary)]"}`}
                  >
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
