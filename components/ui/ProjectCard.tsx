"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
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

  const toggleSection = (section: "problem" | "features" | "outcomes") => {
    if (expandedSection === section) setExpandedSection(null);
    else setExpandedSection(section);
  };

  return (
    <>
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={2000}
        className="h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative h-full flex flex-col glass-panel rounded-2xl overflow-hidden"
        >
          {/* Animated Gradient Border (visible on hover) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-[1px]"
            style={{ zIndex: -1 }}
          >
            <div className="w-full h-full bg-[var(--bg-card)] rounded-2xl" />
          </div>

          <div className="p-6 md:p-8 flex flex-col flex-grow">
            {/* Header / Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
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
              <div className="flex gap-2">
                <span
                  className="px-2 py-1 rounded text-[10px] font-medium tracking-wider uppercase"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary-rgb), 0.1)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {project.difficulty}
                </span>
                <span
                  className="px-2 py-1 rounded text-[10px] font-medium tracking-wider uppercase"
                  style={{
                    background:
                      "color-mix(in srgb, var(--success) 15%, transparent)",
                    color: "var(--success)",
                  }}
                >
                  {project.status}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

            <p
              className="text-sm mb-6 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.overview}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-[var(--bg-accent)] text-[var(--text-secondary)]"
                >
                  <tech.Icon className="w-3.5 h-3.5" />
                  {tech.name}
                </div>
              ))}
            </div>

            {/* Expandable Sections */}
            <div className="space-y-2 mb-6 flex-grow">
              <ExpandableSection
                title="Problem Statement"
                isOpen={expandedSection === "problem"}
                onToggle={() => toggleSection("problem")}
              >
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.problemStatement}
                </p>
              </ExpandableSection>

              <ExpandableSection
                title="Key Features"
                isOpen={expandedSection === "features"}
                onToggle={() => toggleSection("features")}
              >
                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </ExpandableSection>

              <ExpandableSection
                title="Learning Outcomes"
                isOpen={expandedSection === "outcomes"}
                onToggle={() => toggleSection("outcomes")}
              >
                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                  {project.learningOutcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </ExpandableSection>
            </div>

            {/* Action Button */}
            <div
              className="mt-auto pt-4 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 flex items-center justify-center gap-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                  color: "var(--text-secondary)",
                }}
              >
                View Details
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
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
    <div
      className="border rounded-lg overflow-hidden"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "var(--border)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium transition-colors"
        style={{
          backgroundColor: "transparent",
          color: "var(--text-primary)",
          borderColor: "var(--border)",
          borderBottom: "1px solid",
        }}
      >
        {title}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div
          className="p-4 pt-0 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
