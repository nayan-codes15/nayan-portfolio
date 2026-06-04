'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Palette } from 'lucide-react'

const THEMES = [
  {
    id: 'cyber-dark',
    label: 'Cyber',
    icon: '⚡',
    primary: '#00D4FF',
    secondary: '#7B2FBE',
    bg: '#0A0A0F',
    desc: 'Neon · Electric · Default',
  },
  {
    id: 'cyber-intel',
    label: 'Intel',
    icon: '◈',
    primary: '#00E5FF',
    secondary: '#3B82F6',
    bg: '#030712',
    desc: 'Cloudflare · Premium · Cyber',
  },
  {
    id: 'hacker',
    label: 'Hacker',
    icon: '>_',
    primary: '#00F5FF',
    secondary: '#A855F7',
    bg: '#050816',
    desc: 'SOC · Terminal · Dark',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    icon: '◇',
    primary: '#F8FAFC',
    secondary: '#2563EB',
    bg: '#0A0A0A',
    desc: 'Apple · Stripe · Minimal',
  },
] as const

type ThemeId = (typeof THEMES)[number]['id']

const ANGLES  = [100, 120, 140, 160]
const RADIUS  = 76
const BTN_HALF = 24

const FAN = ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180
  return {
    left:   BTN_HALF + Math.cos(rad) * RADIUS - 20,
    bottom: BTN_HALF + Math.sin(rad) * RADIUS - 20,
  }
})

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<ThemeId | null>(null)
  const [showToast, setShowToast] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const seen = localStorage.getItem('portfolio-theme-seen')
    if (!seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowToast(true)
      localStorage.setItem('portfolio-theme-seen', '1')
      const t = setTimeout(() => setShowToast(false), 4000)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault()
        setIsOpen(o => !o)
      }
      if (e.key === 'Escape') setIsOpen(false)
      const n = parseInt(e.key)
      if (n >= 1 && n <= 4) {
        const t = THEMES[n - 1]
        if (t) { setTheme(t.id); setIsOpen(false) }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setTheme])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current &&
          !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  if (!mounted) return null

  const currentTheme = THEMES.find(t => t.id === theme) ?? THEMES[0]
  const hoveredTheme = THEMES.find(t => t.id === hoveredId)

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[9999]"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Fan swatches */}
      <AnimatePresence>
        {isOpen && THEMES.map((t, i) => {
          const pos = FAN[i]
          const isActive  = t.id === theme
          const isHovered = t.id === hoveredId
          return (
            <motion.div
              key={t.id}
              className="absolute"
              style={{ left: pos.left, bottom: pos.bottom }}
              custom={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1, opacity: 1,
                transition: {
                  type: 'spring', stiffness: 320,
                  damping: 22, delay: i * 0.05
                }
              }}
              exit={{
                scale: 0, opacity: 0,
                transition: {
                  duration: 0.18,
                  delay: (THEMES.length - 1 - i) * 0.03
                }
              }}
            >
              <button
                onClick={() => { setTheme(t.id); setIsOpen(false) }}
                onMouseEnter={() => setHoveredId(t.id as ThemeId)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={`Switch to ${t.label} theme (press ${i + 1})`}
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 40, height: 40,
                  background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  boxShadow: isActive
                    ? `0 0 0 2.5px ${t.primary}, 0 0 18px ${t.primary}60`
                    : isHovered
                    ? `0 0 14px ${t.primary}80`
                    : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                <span style={{
                  fontSize: 14, lineHeight: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))'
                }}>
                  {t.icon}
                </span>

                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${t.primary}` }}
                    animate={{ scale: [1, 1.45, 1], opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}

                <span
                  className="absolute flex items-center justify-center
                             rounded font-bold text-[var(--text-primary)]"
                  style={{
                    top: -5, right: -5,
                    width: 16, height: 16,
                    fontSize: 9,
                    background: 'rgba(0,0,0,0.75)',
                    border: `1px solid ${t.primary}50`,
                  }}
                >
                  {i + 1}
                </span>
              </button>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 26
                    }}
                    className="absolute pointer-events-none
                               whitespace-nowrap rounded-lg
                               px-2 py-1 text-xs font-semibold"
                    style={{
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 8,
                      background: t.bg,
                      color: t.primary,
                      border: `1px solid ${t.primary}40`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                      zIndex: 10000,
                    }}
                  >
                    {t.label}
                    <div className="text-[10px] opacity-70 font-normal">
                      {t.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Preview card */}
      <AnimatePresence>
        {hoveredTheme && isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1,
              transition: { type: 'spring', stiffness: 340, damping: 28 }
            }}
            exit={{ opacity: 0, x: 8, transition: { duration: 0.14 } }}
            className="absolute pointer-events-none rounded-xl overflow-hidden"
            style={{
              right: 58, bottom: 0, width: 152,
              background: hoveredTheme.bg,
              border: `1px solid ${hoveredTheme.primary}30`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5),
                          0 0 0 1px ${hoveredTheme.primary}20`,
            }}
          >
            <div className="h-1.5" style={{
              background: `linear-gradient(90deg,
                ${hoveredTheme.primary}, ${hoveredTheme.secondary})`
            }} />
            <div className="p-3 space-y-2">
              <p className="text-xs font-bold"
                 style={{ color: hoveredTheme.primary }}>
                {hoveredTheme.icon} {hoveredTheme.label}
              </p>
              <div className="flex gap-1.5">
                {[hoveredTheme.bg,
                  hoveredTheme.primary,
                  hoveredTheme.secondary].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-full border border-[var(--border)]"
                    style={{ width: 14, height: 14, background: c }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold"
                      style={{ color: hoveredTheme.primary }}>
                  Aa
                </span>
                <div className="space-y-1 flex-1">
                  <div className="h-1.5 rounded-full" style={{
                    width: '100%',
                    background: hoveredTheme.primary,
                    opacity: 0.7
                  }} />
                  <div className="h-1.5 rounded-full" style={{
                    width: '60%',
                    background: hoveredTheme.primary,
                    opacity: 0.35
                  }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-visit toast */}
      <AnimatePresence>
        {showToast && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1,
              transition: { type: 'spring', stiffness: 300, damping: 24 }
            }}
            exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
            className="absolute right-14 bottom-1 pointer-events-none
                       whitespace-nowrap rounded-xl px-3 py-2
                       text-xs font-semibold"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            Pick your vibe 🎨
            <span
              className="absolute right-[-6px] top-1/2
                         -translate-y-1/2 border-4 border-transparent"
              style={{ borderLeftColor: 'var(--border)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen
          ? 'Close theme switcher'
          : 'Open theme switcher (press T)'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 48, height: 48,
          background: 'var(--bg-secondary)',
          border: '1.5px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
        }}
      >
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: '2px solid var(--accent-1)' }}
          animate={{
            boxShadow: isOpen
              ? '0 0 20px var(--glow), 0 0 8px var(--glow) inset'
              : '0 0 8px var(--glow)'
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <Palette
            size={20}
            style={{ color: 'var(--accent-1)' }}
            strokeWidth={1.8}
          />
        </motion.span>

        {/* T keyboard hint */}
        <span
          className="absolute flex items-center justify-center rounded font-bold"
          style={{
            top: -6, left: -6,
            width: 16, height: 16,
            fontSize: 8,
            background: 'var(--bg-primary)',
            color: 'var(--accent-1)',
            border: '1px solid var(--border)',
            lineHeight: 1,
          }}
        >
          T
        </span>

        {/* Current theme dot */}
        <span
          className="absolute flex items-center justify-center rounded-full"
          style={{
            bottom: -4, right: -4,
            width: 16, height: 16,
            background: `linear-gradient(135deg,
              ${currentTheme.primary}, ${currentTheme.secondary})`,
            border: '2px solid var(--bg-primary)',
            fontSize: 8,
          }}
        >
          {currentTheme.icon}
        </span>
      </motion.button>
    </div>
  )
}
