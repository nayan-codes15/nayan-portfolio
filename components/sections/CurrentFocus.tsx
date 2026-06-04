'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2, Database, Brain, Cloud,
  Rocket, Info,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ── Focus item data ───────────────────────────────────────────
interface FocusItem {
  icon: LucideIcon
  title: string
  desc: string
  progress: number
  label: string
}

const FOCUS_ITEMS: FocusItem[] = [
  {
    icon:     Code2,
    title:    'Data Structures & Algorithms',
    desc:     'Strengthening problem-solving skills through consistent practice and study',
    progress: 35,
    label:    'In Progress',
  },
  {
    icon:     Database,
    title:    'Database Management Systems',
    desc:     'Understanding relational databases, normalization, and SQL queries',
    progress: 40,
    label:    'In Progress',
  },
  {
    icon:     Brain,
    title:    'Artificial Intelligence',
    desc:     'Exploring machine learning concepts, neural networks, and AI applications',
    progress: 30,
    label:    'Exploring',
  },
  {
    icon:     Cloud,
    title:    'Cloud Computing',
    desc:     'AWS fundamentals, cloud architecture, and deployment concepts',
    progress: 45,
    label:    'Learning',
  },
  {
    icon:     Rocket,
    title:    'Software Development Projects',
    desc:     'Building real projects to apply concepts and grow a portfolio',
    progress: 50,
    label:    'Active',
  },
]

// ── Progress bar ──────────────────────────────────────────────
function ProgressBar({ progress, trigger }: { progress: number; trigger: boolean }) {
  return (
    <div
      className="relative w-full rounded-full overflow-hidden"
      style={{ height: 6, background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 rounded-full"
        style={{ background: 'var(--gradient-brand)' }}
        initial={{ width: 0 }}
        animate={{ width: trigger ? `${progress}%` : 0 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      {/* Shimmer overlay */}
      {trigger && (
        <motion.div
          className="absolute top-0 left-0 bottom-0 rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s linear infinite',
          }}
        />
      )}
    </div>
  )
}

// ── Focus card ────────────────────────────────────────────────
function FocusCard({
  item,
  index,
  trigger,
}: {
  item: FocusItem
  index: number
  trigger: boolean
}) {
  const Icon = item.icon

  // Label colour mapping
  const labelColors: Record<string, string> = {
    'In Progress': '#60a5fa',
    Exploring:     '#a78bfa',
    Learning:      '#34d399',
    Active:        '#fb923c',
  }
  const labelColor = labelColors[item.label] ?? 'var(--accent-1)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      <div
        className="glass rounded-2xl p-5 h-full card-hover group"
        data-cursor="card"
      >
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 44,
              height: 44,
              background: 'color-mix(in srgb, var(--accent-1) 15%, transparent)',
            }}
          >
            <Icon size={20} style={{ color: 'var(--accent-1)' }} strokeWidth={1.8} />
          </div>

          {/* Status badge */}
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              background: `color-mix(in srgb, ${labelColor} 12%, transparent)`,
              color: labelColor,
              border: `1px solid color-mix(in srgb, ${labelColor} 25%, transparent)`,
            }}
          >
            {item.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold mb-2 leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {item.desc}
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              Progress
            </span>
            <motion.span
              className="text-xs font-bold tabular-nums"
              style={{ color: 'var(--accent-1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: trigger ? 1 : 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
            >
              {trigger ? `${item.progress}%` : '0%'}
            </motion.span>
          </div>
          <ProgressBar progress={item.progress} trigger={trigger} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Section heading ───────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
      style={{
        background: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
        color: 'var(--accent-1)',
        border: '1px solid color-mix(in srgb, var(--accent-1) 25%, transparent)',
      }}
    >
      {text}
    </span>
  )
}

// ── Main section ──────────────────────────────────────────────
export default function CurrentFocus() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section id="current-focus" ref={sectionRef} className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel text="Current Focus" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-black"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            What I&apos;m{' '}
            <span className="gradient-text-static">Working On</span>
          </motion.h2>

          <motion.p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            My learning trajectory as a 2nd year student
          </motion.p>
        </div>

        {/* Cards grid — 2 + 3 layout on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FOCUS_ITEMS.map((item, i) => (
            <FocusCard key={item.title} item={item} index={i} trigger={isInView} />
          ))}
        </div>

        {/* Disclaimer note */}
        <motion.div
          className="mt-10 flex items-start justify-center gap-2 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Info
            size={14}
            strokeWidth={1.8}
            style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: 2 }}
          />
          <p
            className="text-xs max-w-sm"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
          >
            Progress reflects current learning stage, not professional proficiency.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
