"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

const CATEGORIES = ["All", "Web", "React", "AI", "Systems", "Other"] as const;

type Category = (typeof CATEGORIES)[number];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = useMemo(
    () =>
      PROJECTS.filter((project) =>
        activeCategory === "All" ? true : project.category === activeCategory,
      ),
    [activeCategory],
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-py relative overflow-hidden bg-[var(--bg-primary)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.16),_transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(circle_at_bottom,_rgba(124,58,237,0.16),_transparent_40%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 line-grid"
        style={{ backgroundSize: "32px 32px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(0, 240, 255, 0.08)",
              color: "var(--accent-1)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
            }}
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            style={{
              background: "linear-gradient(90deg, #ffffff, #00f0ff, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Projects Built for Real Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Browse selected web, React, JavaScript, and AI projects with live
            demo previews, GitHub source, and in-depth technical details.
          </motion.p>
        </div>

        <div className="relative z-10 mb-10 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-[var(--accent-1)] ${
                activeCategory === category
                  ? "bg-[var(--accent-1)] text-black shadow-[0_10px_30px_rgba(0,240,255,0.22)]"
                  : "bg-[rgba(255,255,255,0.04)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-12 text-center">
              <p className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                No projects match that filter.
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Try another category to explore more web, React, JavaScript, and
                AI work.
              </p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="relative z-10 text-center"
        >
          <p
            className="text-sm italic"
            style={{ color: "var(--text-secondary)" }}
          >
            Each project is selected to highlight relevant technical experience,
            client-ready UX, and modern frontend/backend architecture.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
