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
  ExternalLink,
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
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.82)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[#0A0F14] shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[#061018]/80 text-white transition hover:bg-[#08121d]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden rounded-[28px] border-b border-[rgba(255,255,255,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,153,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,217,255,0.18),transparent_28%)] opacity-80 pointer-events-none" />
              <div className="p-6 sm:p-8 lg:p-10 relative">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="rounded-full border border-[rgba(0,255,170,0.18)] bg-[rgba(0,255,153,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#00FF99]">
                    {project.category}
                  </span>
                  <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#A1A1AA]">
                    {project.difficulty}
                  </span>
                  <span className="rounded-full border border-[rgba(0,217,255,0.18)] bg-[rgba(0,217,255,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#00D9FF]">
                    {project.status}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  {project.title}
                </h2>
                <p className="max-w-3xl text-base leading-7 text-[#C9D1D9]">
                  {project.overview}
                </p>
                {project.imageUrl && (
                  <div className="mt-6 overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[#060b12] shadow-[0_20px_60px_rgba(0,0,0,0.25)] h-64 sm:h-72">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.imageUrl})` }}
                      aria-label={`Preview image for ${project.title}`}
                    />
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#00ff99] px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      Live Demo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      View on GitHub
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
                <div className="space-y-8">
                  <div className="space-y-4 rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                    <div className="flex items-center gap-3 text-[#00FF99]">
                      <Target className="h-5 w-5" />
                      <h3 className="text-xl font-semibold text-white">
                        Problem
                      </h3>
                    </div>
                    <p className="text-sm leading-7 text-[#C9D1D9]">
                      {project.problemStatement}
                    </p>
                  </div>

                  <div className="space-y-4 rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                    <div className="flex items-center gap-3 text-[#00D9FF]">
                      <CheckCircle2 className="h-5 w-5" />
                      <h3 className="text-xl font-semibold text-white">
                        Approach
                      </h3>
                    </div>
                    <ul className="space-y-3 text-sm text-[#C9D1D9]">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#00D9FF]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                    <div className="flex items-center gap-3 text-[#00D9FF] mb-5">
                      <Rocket className="h-5 w-5" />
                      <h3 className="text-xl font-semibold text-white">
                        Technologies
                      </h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#061018] px-4 py-3 text-sm text-[#C9D1D9]"
                        >
                          <tech.Icon className="h-4 w-4 text-[#00FF99]" />
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                    <div className="flex items-center gap-3 text-[#00FF99] mb-5">
                      <Lightbulb className="h-5 w-5" />
                      <h3 className="text-xl font-semibold text-white">
                        Implementation
                      </h3>
                    </div>
                    <p className="text-sm leading-7 text-[#C9D1D9]">
                      A focused implementation flow centered on research
                      validation, system-level exploration, and
                      performance-conscious architecture.
                    </p>
                    <ul className="mt-5 space-y-3 text-sm text-[#C9D1D9]">
                      {project.keyFeatures.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#00FF99]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                  <div className="flex items-center gap-3 text-orange-400 mb-4">
                    <Wrench className="h-5 w-5" />
                    <h3 className="text-xl font-semibold text-white">
                      Challenges
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-[#C9D1D9]">
                    The primary challenge was presenting advanced engineering
                    concepts in a recruiter-friendly format while preserving
                    technical depth and clarity.
                  </p>
                </div>

                <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                  <div className="flex items-center gap-3 text-[#00FF99] mb-4">
                    <Lightbulb className="h-5 w-5" />
                    <h3 className="text-xl font-semibold text-white">
                      Learnings
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#C9D1D9]">
                    {project.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#00FF99]" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#08101A]/90 p-6">
                  <div className="flex items-center gap-3 text-[#00D9FF] mb-4">
                    <Rocket className="h-5 w-5" />
                    <h3 className="text-xl font-semibold text-white">
                      Future Improvements
                    </h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#C9D1D9]">
                    {project.futureImprovements.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-[#00D9FF]" />
                        <span>{item}</span>
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
