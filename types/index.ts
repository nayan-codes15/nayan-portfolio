// ─────────────────────────────────────────────────────────────
//  Portfolio — Global TypeScript Types
// ─────────────────────────────────────────────────────────────

// ── Themes ────────────────────────────────────────────────────
export type ThemeId =
  | 'cyber-dark'
  | 'pure-white'
  | 'void'
  | 'aurora'
  | 'sunset'

export interface ThemeConfig {
  id: ThemeId
  label: string
  /** Preview swatch color */
  swatch: string
  isDark: boolean
}

// ── Cursor ────────────────────────────────────────────────────
export type CursorState = 'default' | 'link' | 'card' | 'text'

export interface CursorRingConfig {
  size: number
  bg: string
  borderColor: string
  glow: string
  showDot: boolean
  label: string | null
}

// ── Navigation ────────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
  /** Optionally matches multiple path prefixes */
  activeOn?: string[]
}

// ── Social Links ──────────────────────────────────────────────
export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'email'
  | 'leetcode'
  | 'codeforces'

export interface SocialLink {
  platform: SocialPlatform
  url: string
  label: string
}

// ── Projects ──────────────────────────────────────────────────
export type ProjectCategory =
  | 'cloud'
  | 'ai'
  | 'systems'
  | 'web'
  | 'data'
  | 'fullstack'

export interface ProjectHighlight {
  text: string
}

export interface ArchStep {
  icon: string
  label: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  category: ProjectCategory
  featured?: boolean
  tech: string[]
  highlights: string[]
  /** Optional architecture flow for cloud projects */
  architecture?: ArchStep[]
  githubUrl?: string
  liveUrl?: string
  /** Year the project was built */
  year: number
}

// ── Skills ────────────────────────────────────────────────────
export interface Skill {
  name: string
  /** 0–100 */
  level: number
  /** Optional icon key from react-icons */
  icon?: string
}

export interface SkillGroup {
  id: string
  label: string
  icon: string
  skills: Skill[]
}

// ── Experience / Timeline ────────────────────────────────────
export type TimelineItemType = 'education' | 'project' | 'achievement' | 'cert'

export interface TimelineItem {
  id: string
  type: TimelineItemType
  title: string
  subtitle: string
  date: string
  description?: string
  tags?: string[]
}

// ── Education ────────────────────────────────────────────────
export interface Education {
  institution: string
  degree: string
  field: string
  year: string
  location: string
  cgpa?: string
  highlights?: string[]
}

// ── Portfolio Meta ────────────────────────────────────────────
export interface PortfolioMeta {
  name: string
  displayName: string
  role: string
  /** Rotating roles for typewriter */
  roles: string[]
  tagline: string
  bio: string
  email: string
  location: string
  resumeUrl: string
  availableFrom: string
  socials: {
    github: string
    linkedin: string
  }
}

// ── Recharts ─────────────────────────────────────────────────
export interface RadarDataPoint {
  subject: string
  value: number
  fullMark: number
}

// ── Page Transition ──────────────────────────────────────────
export interface PageTransitionProps {
  children: React.ReactNode
}

// ── Component Prop Helpers ───────────────────────────────────
export interface WithClassName {
  className?: string
}

export interface WithChildren {
  children: React.ReactNode
}

export type WithChildrenAndClassName = WithChildren & WithClassName
