'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'

// ── Marquee items ─────────────────────────────────────────────
const MARQUEE_ITEMS = [
  { text: '🟢 Open to Internship', accent: true  },
  { text: '·',                      dot: true     },
  { text: 'SDE Intern',             accent: false },
  { text: '·',                      dot: true     },
  { text: 'AI Intern',              accent: false },
  { text: '·',                      dot: true     },
  { text: 'Cloud Intern',           accent: false },
  { text: '·',                      dot: true     },
  { text: 'Data Analytics',         accent: false },
  { text: '·',                      dot: true     },
  { text: 'Available Immediately',  accent: false },
  { text: '·',                      dot: true     },
  { text: 'Remote · Hybrid · On-site', accent: false },
  { text: '·',                      dot: true     },
]

// Render one full track of items
function TrackItems() {
  return (
    <>
      {MARQUEE_ITEMS.map((item, i) => (
        <span
          key={i}
          className="flex-shrink-0 select-none"
          style={{
            marginRight: item.dot ? 24 : 32,
            color: item.accent
              ? '#4ade80'
              : item.dot
              ? 'var(--accent-1)'
              : 'var(--text-secondary)',
            fontWeight: item.accent ? 600 : 400,
          }}
        >
          {item.text}
        </span>
      ))}
    </>
  )
}

// ── Banner ────────────────────────────────────────────────────
export function OpenToWorkBanner() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      role="marquee"
      aria-label="Open to internship opportunities"
      className="relative overflow-hidden"
      style={{
        paddingBlock: '10px',
        background: `linear-gradient(
          135deg,
          color-mix(in srgb, var(--accent-1) 10%, var(--bg-secondary)),
          color-mix(in srgb, var(--accent-2)  7%, var(--bg-secondary))
        )`,
        borderTop:    '1px solid color-mix(in srgb, var(--accent-1) 30%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--accent-1) 30%, transparent)',
        boxShadow:    '0 0 20px -6px var(--glow), inset 0 0 20px -12px var(--glow)',
      }}
    >
      {/* ── Scrolling marquee ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="flex items-center"
        style={{ overflow: 'hidden', paddingRight: 220 /* room for location badge */ }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex items-center"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            width: 'max-content',
            fontSize: 13,
            lineHeight: '1',
            animation: 'marqueeScroll 32s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {/* Two identical copies for seamless loop */}
          <TrackItems />
          <TrackItems />
        </div>
      </div>

      {/* ── Static location badge (right) ─────────────────── */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center gap-1.5 pr-4 pl-8 text-xs font-medium pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            color-mix(in srgb, var(--bg-secondary) 95%, transparent) 28%,
            var(--bg-secondary)
          )`,
        }}
      >
        <MapPin
          size={12}
          strokeWidth={2}
          style={{ color: 'var(--accent-1)', flexShrink: 0 }}
        />
        <span style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          Samastipur, Bihar, India
        </span>
      </div>
    </div>
  )
}
