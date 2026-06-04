"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Certification } from "@/data/certifications";

interface CertificationModalProps {
  cert: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificationModal({
  cert,
  isOpen,
  onClose,
}: CertificationModalProps) {
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
      {isOpen && cert && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glass-panel rounded-2xl border shadow-2xl"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="pr-12">
                <h3 className="font-bold text-lg truncate">{cert.name}</h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {cert.issuer}
                </p>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                  color: "var(--text-secondary)",
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content / Preview */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-[rgba(var(--bg-primary-rgb),0.2)] flex flex-col items-center justify-center min-h-[40vh]">
              {cert.pdfUrl ? (
                <iframe
                  src={`${cert.pdfUrl}#toolbar=0`}
                  className="w-full h-[60vh] rounded-lg border border-[var(--border)] bg-white"
                  title={`${cert.name} Certificate PDF`}
                />
              ) : cert.imageUrl ? (
                <div className="relative w-full aspect-[1.414/1] sm:aspect-video rounded-lg overflow-hidden border border-[var(--border)] shadow-lg">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    fill
                    className="object-contain bg-[rgba(var(--bg-primary-rgb),0.5)]"
                  />
                </div>
              ) : (
                <div className="text-[var(--text-muted)] text-center">
                  <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Preview not available</p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-[var(--border)] bg-[rgba(var(--bg-primary-rgb),0.5)] flex flex-wrap gap-3 justify-end">
              {(cert.pdfUrl || cert.imageUrl) && (
                <a
                  href={cert.pdfUrl || cert.imageUrl}
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              )}
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--accent-1)] text-black hover:bg-[var(--accent-1)]/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify Credential
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
