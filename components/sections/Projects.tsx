"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-py relative overflow-hidden bg-[#050505] noise"
      style={{ color: "#ffffff" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(0,255,153,0.12),_transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(circle_at_bottom,_rgba(0,217,255,0.12),_transparent_38%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 line-grid"
        style={{ backgroundSize: "34px 34px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative z-10 text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(0, 255, 153, 0.08)",
              color: "#00FF99",
              border: "1px solid rgba(0, 255, 153, 0.18)",
            }}
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            style={{
              background: "linear-gradient(90deg, #ffffff, #00FF99, #00D9FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What I Have Built and Learned
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "#A1A1AA" }}
          >
            Exploring complex concepts through hands-on development.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 mb-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="relative z-10 text-center"
        >
          <p className="text-sm italic" style={{ color: "#A1A1AA" }}>
            Projects reflect learning-stage work and are actively being expanded
            with deeper technical studies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
