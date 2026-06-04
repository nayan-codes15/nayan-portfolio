'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GithubProfile, GithubRepo } from '@/lib/github'
import ProfileOverview from './ProfileOverview'
import TopRepos from './TopRepos'
import LanguageChart from './LanguageChart'
import CountUp from './CountUp'
import { Star, GitCommit, GitPullRequest, AlertCircle, Activity } from 'lucide-react'

interface GithubActivityClientProps {
  stats: {
    profile: GithubProfile
    totalStars: number
    totalRepos: number
    topLanguages: { name: string; count: number }[]
    topRepos: GithubRepo[]
  } | null
}

export default function GithubActivityClient({ stats }: GithubActivityClientProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  if (!stats) {
    return (
      <section id="github" className="section-py relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="w-6 h-6 mr-3" />
            <span>GitHub API rate limit exceeded. Please try again later.</span>
          </div>
        </div>
      </section>
    )
  }

  const { profile, totalStars, topLanguages, topRepos } = stats

  return (
    <section id="github" ref={sectionRef} className="section-py relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
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
            Open Source
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 gradient-text-static"
          >
            GitHub Activity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            My open source presence and contributions over time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Column 1: Profile & Languages */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ProfileOverview profile={profile} />
            <LanguageChart data={topLanguages} />
          </div>

          {/* Column 2: Stats & Top Repos */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <StatCard icon={<Star className="w-5 h-5 text-yellow-500" />} label="Total Stars" value={totalStars} />
              <StatCard icon={<GitCommit className="w-5 h-5 text-green-500" />} label="Commits" value={0} placeholder="-" />
              <StatCard icon={<GitPullRequest className="w-5 h-5 text-purple-500" />} label="PRs" value={0} placeholder="-" />
              <StatCard icon={<AlertCircle className="w-5 h-5 text-orange-500" />} label="Issues" value={0} placeholder="-" />
            </motion.div>

            {/* Top Repos */}
            <TopRepos repos={topRepos} />

            {/* SVGs Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {/* Contribution Graph (SVG) */}
              <div className="glass-panel p-6 rounded-2xl border border-[var(--border)] flex flex-col items-center justify-center min-h-[220px]">
                <h3 className="text-sm font-semibold mb-4 text-[var(--text-secondary)] self-start flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Contribution Activity
                </h3>
                <img 
                  src={`https://github-readme-stats.vercel.app/api?username=${profile.login}&show_icons=true&theme=react&hide_border=true&bg_color=00000000`} 
                  alt="GitHub Stats" 
                  className="max-w-full h-auto drop-shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Streak Stats (SVG) */}
              <div className="glass-panel p-6 rounded-2xl border border-[var(--border)] flex flex-col items-center justify-center min-h-[220px]">
                <h3 className="text-sm font-semibold mb-4 text-[var(--text-secondary)] self-start flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Streak Stats
                </h3>
                <img 
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${profile.login}&theme=react&hide_border=true&background=00000000`} 
                  alt="GitHub Streak" 
                  className="max-w-full h-auto drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

function StatCard({ icon, label, value, placeholder }: { icon: React.ReactNode, label: string, value: number, placeholder?: string }) {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-[var(--border)] flex flex-col items-center justify-center gap-2 group hover:border-[var(--accent-1)]/30 transition-colors">
      <div className="p-3 rounded-full bg-black/30 border border-[var(--border)] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)]">
        {placeholder ? placeholder : <CountUp to={value} />}
      </div>
      <div className="text-xs text-[var(--text-muted)] font-medium tracking-wide uppercase">{label}</div>
    </div>
  )
}
