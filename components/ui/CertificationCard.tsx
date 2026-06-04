"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Award, FileText } from "lucide-react";
import { Certification } from "@/data/certifications";
import Tilt from "react-parallax-tilt";

interface CertificationCardProps {
  cert: Certification;
  index: number;
  onView: (cert: Certification) => void;
}

export default function CertificationCard({
  cert,
  index,
  onView,
}: CertificationCardProps) {
  return (
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
        {/* Animated Glow Border */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-[1px]"
          style={{ zIndex: -1 }}
        >
          <div className="w-full h-full bg-[var(--bg-card)] rounded-2xl" />
        </div>

        {/* Thumbnail Preview */}
        <div
          className="relative w-full aspect-video border-b overflow-hidden"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderColor: "var(--border)",
          }}
        >
          {cert.imageUrl ? (
            <Image
              src={cert.imageUrl}
              alt={cert.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: "var(--text-secondary)" }}
            >
              <Award className="w-12 h-12 opacity-20" />
            </div>
          )}

          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            {cert.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent-1)] transition-colors line-clamp-2">
            {cert.name}
          </h3>

          <div
            className="text-sm mb-6 flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {cert.issuer}
            </span>
            {cert.issueDate && (
              <>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
                <span>{cert.issueDate}</span>
              </>
            )}
          </div>

          <div
            className="mt-auto flex items-center gap-3 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => onView(cert)}
              className="flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--accent-1)", color: "black" }}
            >
              <FileText className="w-4 h-4" />
              View
            </button>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                  color: "var(--text-secondary)",
                }}
              >
                Verify
                <ExternalLink
                  className="w-4 h-4"
                  style={{ color: "var(--text-secondary)" }}
                />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}
