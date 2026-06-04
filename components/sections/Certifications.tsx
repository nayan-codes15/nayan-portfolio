"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck } from "lucide-react";
import {
  CERTIFICATIONS,
  CERTIFICATION_CATEGORIES,
  Certification,
} from "@/data/certifications";
import CertificationCard from "@/components/ui/CertificationCard";
import CertificationModal from "@/components/ui/CertificationModal";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Filter & Search Logic
  const filteredCerts = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      const matchesCategory =
        activeCategory === "All" || cert.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        cert.name.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Get unique categories actually present in the data to build the top stats bar
  const uniqueDomainsCount = new Set(CERTIFICATIONS.map((c) => c.category))
    .size;

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-py relative bg-[rgba(var(--bg-primary-rgb),0.2)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background:
                "color-mix(in srgb, var(--accent-1) 12%, transparent)",
              color: "var(--accent-1)",
              border:
                "1px solid color-mix(in srgb, var(--accent-1) 25%, transparent)",
            }}
          >
            Milestones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 gradient-text-static"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Showcase verified certifications, industry-recognized virtual
            experiences, and professional skill assessments earned through
            continuous learning and practical application.
          </motion.p>
        </div>

        {/* Top Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 p-4 sm:p-6 rounded-2xl glass-panel border border-[var(--border)]"
        >
          <StatBox value={`${CERTIFICATIONS.length}+`} label="Certifications" />
          <div className="w-px h-12 bg-[var(--bg-card)] hidden sm:block" />
          <StatBox value={`${uniqueDomainsCount}`} label="Learning Domains" />
          <div className="w-px h-12 bg-[var(--bg-card)] hidden sm:block" />
          <StatBox
            value="100%"
            label="Verifiable Credentials"
            icon={<ShieldCheck className="w-5 h-5 text-[var(--success)]" />}
          />
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
        >
          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
            {CERTIFICATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[var(--accent-1)] text-black shadow-[0_0_15px_color-mix(in_srgb,var(--accent-1)_50%,transparent)]"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search by name or issuer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/30 border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-[var(--accent-1)]/50 transition-colors placeholder:text-gray-600"
            />
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={cert.id}
                >
                  <CertificationCard
                    cert={cert}
                    index={index}
                    onView={setSelectedCert}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-[var(--text-muted)]"
              >
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>No certifications found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <p className="text-sm text-[var(--text-muted)] leading-relaxed italic">
            Certifications are earned through structured online learning
            programs, industry-recognized virtual experiences, professional
            skill assessments, and academic participation programs,
            demonstrating continuous growth in technology, cloud computing,
            artificial intelligence, analytics, and software development.
          </p>
        </motion.div>
      </div>

      <CertificationModal
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}

function StatBox({
  value,
  label,
  icon,
}: {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
          {value}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[var(--text-muted)]">
        {label}
      </span>
    </div>
  );
}
