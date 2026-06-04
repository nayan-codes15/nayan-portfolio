'use client'

import {
  useEffect, useState, useCallback,
} from 'react'
import {
  useMotionValue, useSpring, motion, AnimatePresence,
} from 'framer-motion'
import { useTheme } from 'next-themes'
import { useMounted } from '@/hooks/useMounted'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { isTouchDevice } from '@/lib/utils'

// ── Cursor state ──────────────────────────────────────────────
type CursorState = 'default' | 'link' | 'card'

// ── Spring configs ────────────────────────────────────────────
const RING_SPRING = { stiffness: 120, damping: 18, mass: 0.15 }
const DOT_SPRING  = { stiffness: 620, damping: 34, mass: 0.04 }

// ── Sizing config per state ───────────────────────────────────
const STATE_CONFIG: Record<CursorState, { ring: number; dot: number; label: string | null }> = {
  default: { ring: 36,  dot: 6,  label: null     },
  link:    { ring: 52,  dot: 0,  label: 'CLICK'  },
  card:    { ring: 64,  dot: 0,  label: 'VIEW'   },
}

// ── Theme-specific ring colours ───────────────────────────────
const THEME_COLORS: Record<string, { ring: string; glow: string }> = {
  'cyber-dark': { ring: '#00D4FF', glow: 'rgba(0,212,255,0.35)' },
  'pure-white': { ring: '#2563EB', glow: 'rgba(37,99,235,0.25)' },
  'void':       { ring: '#FFFFFF', glow: 'rgba(255,255,255,0.2)' },
  'aurora':     { ring: '#00FFB3', glow: 'rgba(0,255,179,0.35)' },
  'sunset':     { ring: '#FF6B35', glow: 'rgba(255,107,53,0.35)' },
}
const DEFAULT_COLORS = THEME_COLORS['cyber-dark']

// ── Crosshair (Void theme only) ───────────────────────────────
function Crosshair() {
  return (
    <>
      {/* Horizontal left arm */}
      <div className="absolute" style={{ width: 14, height: 1.5, background: '#fff', right: '50%', marginRight: 4, top: '50%', marginTop: -0.75 }} />
      {/* Horizontal right arm */}
      <div className="absolute" style={{ width: 14, height: 1.5, background: '#fff', left: '50%', marginLeft: 4, top: '50%', marginTop: -0.75 }} />
      {/* Vertical top arm */}
      <div className="absolute" style={{ height: 14, width: 1.5, background: '#fff', bottom: '50%', marginBottom: 4, left: '50%', marginLeft: -0.75 }} />
      {/* Vertical bottom arm */}
      <div className="absolute" style={{ height: 14, width: 1.5, background: '#fff', top: '50%', marginTop: 4, left: '50%', marginLeft: -0.75 }} />
    </>
  )
}

// ── Aurora ripple overlay ─────────────────────────────────────
function AuroraRipple({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9994] rounded-full"
      style={{
        left: x,
        top:  y,
        width: 48,
        height: 48,
        marginLeft: -24,
        marginTop:  -24,
        border: '2px solid #00FFB3',
        animation: 'auroraRipple 2s ease-out infinite',
      }}
    />
  )
}

// ── Main cursor ───────────────────────────────────────────────
export function CustomCursor() {
  const mounted       = useMounted()
  const reducedMotion = useReducedMotion()
  const { theme }     = useTheme()

  const [visible,     setVisible]   = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isTouch,     setIsTouch]   = useState(false)

  // Raw mouse motion values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Ring follows with lag
  const ringX = useSpring(rawX, RING_SPRING)
  const ringY = useSpring(rawY, RING_SPRING)

  // Dot follows precisely
  const dotX = useSpring(rawX, DOT_SPRING)
  const dotY = useSpring(rawY, DOT_SPRING)

  // Detect hover target
  const detectState = useCallback((el: Element | null): CursorState => {
    if (!el) return 'default'
    const target = el.closest('[data-cursor]') as HTMLElement | null
    const attr = target?.dataset.cursor
    if (attr === 'card') return 'card'
    if (attr === 'link') return 'link'
    // Interactive elements default
    if (el.closest('a, button, [role="button"]')) return 'link'
    return 'default'
  }, [])

  useEffect(() => {
    if (!mounted) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(isTouchDevice())
  }, [mounted])

  useEffect(() => {
    if (!mounted || isTouch) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
      setCursorState(detectState(e.target as Element))
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [mounted, isTouch, rawX, rawY, detectState])

  // Don't render on SSR, reduced-motion, or touch
  if (!mounted || isTouch || reducedMotion) return null

  const themeKey   = theme ?? 'cyber-dark'
  const colors     = THEME_COLORS[themeKey] ?? DEFAULT_COLORS
  const isVoid     = themeKey === 'void'
  const isAurora   = themeKey === 'aurora'
  const cfg        = STATE_CONFIG[cursorState]

  return (
    <>
      {/* Aurora ripple layer */}
      {isAurora && visible && (
        <AuroraRipple
          x={rawX.get()}
          y={rawY.get()}
        />
      )}

      {/* ── Outer ring ─────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9995] rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width:  cfg.ring,
          height: cfg.ring,
          marginLeft: -cfg.ring / 2,
          marginTop:  -cfg.ring / 2,
          border: isVoid ? '1.5px solid #fff' : `1.5px solid ${colors.ring}`,
          boxShadow: isVoid ? 'none' : `0 0 12px ${colors.glow}`,
          backgroundColor: cursorState !== 'default'
            ? `${colors.ring}20`
            : 'transparent',
          transition: 'width 0.22s ease, height 0.22s ease, margin 0.22s ease, background-color 0.2s ease',
        }}
      >
        {/* Crosshair for Void */}
        {isVoid && <Crosshair />}

        {/* CLICK / VIEW label */}
        <AnimatePresence>
          {cfg.label && (
            <motion.span
              key={cfg.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-[9px] font-bold tracking-widest select-none"
              style={{ color: colors.ring }}
            >
              {cfg.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Inner dot ──────────────────────────────────── */}
      <AnimatePresence>
        {cfg.dot > 0 && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed z-[9996] rounded-full"
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{
              x: dotX,
              y: dotY,
              width:  cfg.dot,
              height: cfg.dot,
              marginLeft: -cfg.dot / 2,
              marginTop:  -cfg.dot / 2,
              backgroundColor: isVoid ? '#fff' : colors.ring,
              boxShadow: isVoid ? 'none' : `0 0 6px ${colors.glow}`,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
