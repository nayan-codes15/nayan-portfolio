"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [expandedSection, setExpandedSection] = useState<
    "problem" | "features" | "outcomes" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PrimaryIcon = project.technologies[0]?.Icon;
  const actionGradient =
    index === 0
      ? "linear-gradient(90deg, #00FF99, #20F2C7)"
      : "linear-gradient(90deg, #00D9FF, #4FB7FF)";

  const toggleSection = (section: "problem" | "features" | "outcomes") => {
    setExpandedSection((current) => (current === section ? null : section));
  };

  return (
    <>
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        scale={1}
        transitionSpeed={2500}
        className="h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="group relative h-full flex flex-col rounded-[24px] border border-[rgba(0,255,170,0.15)] bg-[#0A0F14] shadow-[0_30px_80px_rgba(0,0,0,0.22)] transition-transform duration-400 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,255,153,0.18)] overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(0,255,153,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,217,255,0.12),transparent_32%)] opacity-90" />
          <div className="absolute inset-0 pointer-events-none rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_45%)] opacity-40" />
          <div className="relative p-6 md:p-8 flex flex-col flex-grow">
            <div className="flex flex-col gap-6 mb-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-[rgba(0,255,170,0.18)] bg-[#061018] text-white shadow-[inset_0_0_0_1px_rgba(0,255,153,0.08)]">
                  {PrimaryIcon ? (
                    <PrimaryIcon className="h-6 w-6 text-[#00FF99]" />
                  ) : (
                    <span className="text-sm font-bold">P</span>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#A1A1AA]">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#00FF99] border-[rgba(0,255,170,0.18)] bg-[rgba(0,255,153,0.08)]">
                  {project.difficulty}
                </span>
                <span className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#00D9FF] border-[rgba(0,217,255,0.18)] bg-[rgba(0,217,255,0.08)]">
                  {project.status}
                </span>
              </div>
            </div>

            <p className="text-sm leading-7 text-[#A1A1AA] mb-6">
              {project.overview}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-white/5 px-3 py-2 text-xs font-medium text-[#E5E7EB]"
                >
                  <tech.Icon className="h-3.5 w-3.5 text-[#00FF99]" />
                  {tech.name}
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <ExpandableSection
                title="Problem Statement"
                isOpen={expandedSection === "problem"}
                onToggle={() => toggleSection("problem")}
              >
                <p className="text-sm leading-7 text-[#C9D1D9]">
                  {project.problemStatement}
                </p>
              </ExpandableSection>

              <ExpandableSection
                title="Key Features"
                isOpen={expandedSection === "features"}
                onToggle={() => toggleSection("features")}
              >
                <ul className="list-disc list-inside space-y-2 text-sm text-[#C9D1D9]">
                  {project.keyFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </ExpandableSection>

              <ExpandableSection
                title="Learning Outcomes"
                isOpen={expandedSection === "outcomes"}
                onToggle={() => toggleSection("outcomes")}
              >
                <ul className="list-disc list-inside space-y-2 text-sm text-[#C9D1D9]">
                  {project.learningOutcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
              </ExpandableSection>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
              style={{
                background: actionGradient,
                boxShadow:
                  index === 0
                    ? "0 18px 50px rgba(0,255,153,0.22)"
                    : "0 18px 50px rgba(0,217,255,0.22)",
              }}
            >
              View Details
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </Tilt>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function ExpandableSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[rgba(0,255,170,0.18)] bg-[#08101A]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-white transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="border-t border-[rgba(255,255,255,0.08)] px-4 py-4 text-sm text-[#C9D1D9]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
