import type { Metadata } from 'next'

import Hero             from '@/components/sections/Hero'
import { OpenToWorkBanner } from '@/components/sections/OpenToWorkBanner'
import About            from '@/components/sections/About'
import CurrentFocus     from '@/components/sections/CurrentFocus'
import TechUniverse     from '@/components/sections/TechUniverse'
import SkillsMatrix     from '@/components/sections/SkillsMatrix'
import Projects         from '@/components/sections/Projects'
import GithubActivity   from '@/components/sections/GithubActivity'
import Certifications   from '@/components/sections/Certifications'
import Education        from '@/components/sections/Education'
import LearningJourney  from '@/components/sections/LearningJourney'
import Contact          from '@/components/sections/Contact'


export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <Hero />

      {/* ── Open to Work banner (between Hero & About) ─── */}
      <OpenToWorkBanner />

      {/* ── About Me ────────────────────────────────────── */}
      <About />

      {/* ── Current Focus ───────────────────────────────── */}
      <CurrentFocus />

      {/* ── Tech Universe (3D Globe) ────────────────────── */}
      <TechUniverse />

      {/* ── Skills Matrix ───────────────────────────────── */}
      <SkillsMatrix />

      {/* ── Projects ────────────────────────────────────── */}
      <Projects />

      {/* ── GitHub Activity ─────────────────────────────── */}
      <GithubActivity />

      {/* ── Certifications ──────────────────────────────── */}
      <Certifications />

      {/* ── Education ───────────────────────────────────── */}
      <Education />

      {/* ── Learning Journey ────────────────────────────── */}
      <LearningJourney />

      {/* ── Contact ─────────────────────────────────────── */}
      <Contact />

    </>
  )
}
