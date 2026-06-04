import type { ThemeConfig, NavLink } from '@/types'

// ── Theme Definitions ─────────────────────────────────────────
export const THEMES: ThemeConfig[] = [
  {
    id: 'cyber-dark',
    label: 'Cyber Dark',
    swatch: '#00D4FF',
    isDark: true,
  },
  {
    id: 'pure-white',
    label: 'Pure White',
    swatch: '#2563EB',
    isDark: false,
  },
  {
    id: 'void',
    label: 'Void',
    swatch: '#FFFFFF',
    isDark: true,
  },
  {
    id: 'aurora',
    label: 'Aurora',
    swatch: '#00FFB3',
    isDark: true,
  },
  {
    id: 'sunset',
    label: 'Sunset',
    swatch: '#FF6B35',
    isDark: true,
  },
] as const

export const DEFAULT_THEME = 'cyber-dark'

// ── Navigation ────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Contact',  href: '#contact'  },
]

// ── Cursor data attributes ────────────────────────────────────
export const CURSOR = {
  LINK: { 'data-cursor': 'link' },
  CARD: { 'data-cursor': 'card' },
  TEXT: { 'data-cursor': 'text' },
} as const

// ── Spring configs (shared across components) ─────────────────
export const SPRINGS = {
  /** Outer ring — laggy, smooth */
  ring: { stiffness: 120, damping: 18, mass: 0.15 },
  /** Inner dot — tight, precise */
  dot: { stiffness: 600, damping: 32, mass: 0.04 },
  /** General UI spring */
  ui: { stiffness: 260, damping: 24 },
  /** Gentle bounce */
  bounce: { stiffness: 180, damping: 12 },
} as const

// ── Animation variants (Framer Motion) ───────────────────────
export const FADE_UP = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export const FADE_IN = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const STAGGER_CHILDREN = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const SCALE_IN = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

// ── Breakpoints (mirrors Tailwind) ────────────────────────────
export const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  '2xl': 1536,
} as const

// ── Section IDs ───────────────────────────────────────────────
export const SECTION_IDS = {
  hero:     'hero',
  about:    'about',
  projects: 'projects',
  skills:   'skills',
  contact:  'contact',
} as const

// ── Skill chart radar subjects ────────────────────────────────
export const RADAR_SUBJECTS = [
  { subject: 'Cloud',       fullMark: 100 },
  { subject: 'Frontend',    fullMark: 100 },
  { subject: 'Backend',     fullMark: 100 },
  { subject: 'Algorithms',  fullMark: 100 },
  { subject: 'AI / ML',     fullMark: 100 },
  { subject: 'DevTools',    fullMark: 100 },
] as const
