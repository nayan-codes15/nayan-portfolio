'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Info } from 'lucide-react'
import {
  SiC, SiCplusplus, SiPython,
  SiGoogleanalytics, SiGit, SiGithub, SiGnubash,
  SiHtml5
} from 'react-icons/si'
import { FaJava, FaDatabase, FaBrain, FaRobot, FaCloud, FaChartLine, FaAws, FaCss3, FaWindows, FaCode } from 'react-icons/fa'

import { IconType } from 'react-icons'

// ── Types & Data ──────────────────────────────────────────────────
type Level = 'basic' | 'learning' | 'basic-intermediate' | 'intermediate' | 'comfortable'

interface Skill {
  name: string
  category: string
  level: Level
  Icon: IconType
}

const SKILLS: Skill[] = [
  // Programming
  { name: 'C', category: 'Programming', level: 'intermediate', Icon: SiC },
  { name: 'C++', category: 'Programming', level: 'intermediate', Icon: SiCplusplus },
  { name: 'Java', category: 'Programming', level: 'basic-intermediate', Icon: FaJava },
  { name: 'Python', category: 'Programming', level: 'basic', Icon: SiPython },
  // AI & Data
  { name: 'Artificial Intelligence', category: 'AI & Data', level: 'learning', Icon: FaBrain },
  { name: 'Generative AI', category: 'AI & Data', level: 'learning', Icon: FaRobot },
  { name: 'Data Analytics', category: 'AI & Data', level: 'learning', Icon: FaChartLine },
  { name: 'Google Analytics', category: 'AI & Data', level: 'basic', Icon: SiGoogleanalytics },
  // Cloud & Database
  { name: 'AWS Fundamentals', category: 'Cloud & DB', level: 'basic', Icon: FaAws },
  { name: 'Cloud Computing', category: 'Cloud & DB', level: 'learning', Icon: FaCloud },
  { name: 'DBMS', category: 'Cloud & DB', level: 'learning', Icon: FaDatabase },
  { name: 'SQL', category: 'Cloud & DB', level: 'basic', Icon: FaDatabase },
  // Tools
  { name: 'Git', category: 'Tools', level: 'basic-intermediate', Icon: SiGit },
  { name: 'GitHub', category: 'Tools', level: 'basic-intermediate', Icon: SiGithub },
  { name: 'VS Code', category: 'Tools', level: 'comfortable', Icon: FaCode },
  { name: 'Linux', category: 'Tools', level: 'basic', Icon: SiGnubash },
  { name: 'Windows', category: 'Tools', level: 'comfortable', Icon: FaWindows },
  { name: 'HTML', category: 'Tools', level: 'basic', Icon: SiHtml5 },
  { name: 'CSS', category: 'Tools', level: 'basic', Icon: FaCss3 },
]

const TABS = ['All', 'Programming', 'AI & Data', 'Cloud & DB', 'Tools']

// Level metadata mapping
const LEVEL_META: Record<Level, { percent: number; label: string; desc: string; color: string }> = {
  'basic': { percent: 25, label: 'Basic', desc: 'Familiar with syntax and core concepts', color: '#60a5fa' },
  'learning': { percent: 35, label: 'Learning', desc: 'Actively studying and practicing', color: '#a78bfa' },
  'basic-intermediate': { percent: 50, label: 'Basic-Int.', desc: 'Building practical projects', color: '#34d399' },
  'intermediate': { percent: 60, label: 'Intermediate', desc: 'Comfortable with standard usage', color: '#fb923c' },
  'comfortable': { percent: 70, label: 'Comfortable', desc: 'Regularly using in workflow', color: '#f43f5e' },
}

// ── Circular Progress Ring ────────────────────────────────────────
function ProgressRing({ percent, color, trigger }: { percent: number; color: string; trigger: boolean }) {
  const radius = 22
  const stroke = 4
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="var(--bg-card)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: trigger ? strokeDashoffset : circumference }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color: 'var(--text-primary)' }}>
        {percent}%
      </div>
    </div>
  )
}

// ── Skill Card ────────────────────────────────────────────────────
function SkillCard({ skill, trigger }: { skill: Skill; trigger: boolean }) {
  const meta = LEVEL_META[skill.level]
  const Icon = skill.Icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        scale={1.02}
        transitionSpeed={400}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor={meta.color}
        glarePosition="all"
        className="h-full"
      >
        <div
          className="glass rounded-xl p-5 h-full relative group overflow-hidden border border-[var(--border)] transition-colors duration-300"
          style={{ '--hover-glow': meta.color } as React.CSSProperties}
        >
          {/* Hover glow background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, ${meta.color} 0%, transparent 70%)` }}
          />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ background: `color-mix(in srgb, ${meta.color} 15%, transparent)` }}
            >
              <Icon size={20} color={meta.color} />
            </div>
            <ProgressRing percent={meta.percent} color={meta.color} trigger={trigger} />
          </div>

          <div className="relative z-10">
            <h4 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{skill.name}</h4>
            <span
              className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
              style={{
                background: `color-mix(in srgb, ${meta.color} 15%, transparent)`,
                color: meta.color,
                border: `1px solid color-mix(in srgb, ${meta.color} 30%, transparent)`
              }}
            >
              {meta.label}
            </span>
          </div>

          {/* Hover reveals description */}
          <div className="absolute inset-x-0 bottom-0 p-5 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20"
               style={{ background: 'var(--bg-secondary)', borderTop: `1px solid color-mix(in srgb, ${meta.color} 30%, transparent)` }}>
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
              {meta.desc}
            </p>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

// ── Main Section ──────────────────────────────────────────────────
export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const filteredSkills = SKILLS.filter(s => activeTab === 'All' || s.category === activeTab)

  return (
    <section id="skills" ref={sectionRef} className="section-py relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
              color: 'var(--accent-1)',
              border: '1px solid color-mix(in srgb, var(--accent-1) 25%, transparent)'
            }}
          >
            Skills Matrix
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black mb-4 gradient-text-static"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            What I know and what I&apos;m building on
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors z-10"
              style={{
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)'
              }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ background: 'var(--gradient-brand)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} trigger={isInView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-2 text-center"
        >
          <Info size={14} style={{ color: 'var(--text-secondary)' }} />
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Skill levels reflect honest self-assessment as a student, not professional experience.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
