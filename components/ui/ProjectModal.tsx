"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Target,
  CheckCircle2,
  Rocket,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border custom-scrollbar shadow-2xl"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
              style={{
                backgroundColor: "rgba(var(--bg-primary-rgb), 0.5)",
                color: "var(--text-secondary)",
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="mb-8 pr-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent-1) 15%, transparent)",
                      color: "var(--accent-1)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(var(--bg-primary-rgb), 0.1)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {project.difficulty}
                  </span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.title}
                </h2>
                <p
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.overview}
                </p>
              </div>

              {/* Tech Constellation */}
              <div
                className="mb-12 p-8 rounded-xl border relative overflow-hidden flex items-center justify-center min-h-[160px]"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at center, var(--accent-1) 0%, transparent 70%)",
                  }}
                />
                <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div
                        className="w-16 h-16 rounded-full border flex items-center justify-center text-3xl group-hover:scale-110 group-hover:text-[var(--accent-1)] transition-all duration-300"
                        style={{
                          backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                          borderColor: "var(--border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <tech.Icon />
                      </div>
                      <span
                        className="text-xs transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Problem Statement */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--accent-2)]">
                    <Target className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Problem Statement</h3>
                  </div>
                  <div
                    className="p-5 rounded-xl h-[calc(100%-2rem)]"
                    style={{
                      backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                      borderColor: "var(--border)",
                      border: "1px solid",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {project.problemStatement}
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--accent-1)]">
                    <Rocket className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Key Features</h3>
                  </div>
                  <ul className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] space-y-3 h-[calc(100%-2rem)] text-[var(--text-secondary)]">
                    {project.keyFeatures.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent-1)] shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learning Outcomes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--success)]">
                    <Lightbulb className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">Learning Outcomes</h3>
                  </div>
                  <ul className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] space-y-3 h-[calc(100%-2rem)] text-[var(--text-secondary)]">
                    {project.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)] mt-2 shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Future Improvements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-orange-400">
                    <Wrench className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">
                      Future Improvements
                    </h3>
                  </div>
                  <ul className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] space-y-3 h-[calc(100%-2rem)] text-[var(--text-secondary)]">
                    {project.futureImprovements.map((improvement, i) => (
                      <li key={i} className="flex gap-3 text-[var(--text-secondary)]">
                        <span className="font-mono text-orange-400/50">
                          {(i + 1).toString().padStart(2, "0")}.
                        </span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
