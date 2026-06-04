'use client'

import { motion } from 'framer-motion'
import { GithubProfile } from '@/lib/github'
import CountUp from './CountUp'
import { Calendar, Users, BookOpen } from 'lucide-react'
import Image from 'next/image'

export default function ProfileOverview({ profile }: { profile: GithubProfile }) {
  const joinYear = new Date(profile.created_at).getFullYear()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-6 rounded-2xl border border-[var(--border)] h-full flex flex-col relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-1)]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
      
      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--accent-1)]/30">
          <Image 
            src={profile.avatar_url} 
            alt={profile.login} 
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{profile.name || profile.login}</h3>
          <a 
            href={profile.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent-1)] hover:underline"
          >
            @{profile.login}
          </a>
        </div>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-6 flex-grow relative z-10">
        {profile.bio || 'Building solutions and contributing to open source.'}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-auto relative z-10">
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[rgba(var(--bg-primary-rgb),0.2)] border border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Users className="w-3.5 h-3.5" />
            Followers
          </div>
          <div className="text-xl font-bold text-[var(--text-primary)]">
            <CountUp to={profile.followers} />
          </div>
        </div>
        
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[rgba(var(--bg-primary-rgb),0.2)] border border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <BookOpen className="w-3.5 h-3.5" />
            Public Repos
          </div>
          <div className="text-xl font-bold text-[var(--text-primary)]">
            <CountUp to={profile.public_repos} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-muted)] relative z-10">
        <Calendar className="w-3.5 h-3.5" />
        Joined GitHub in {joinYear}
      </div>
    </motion.div>
  )
}
