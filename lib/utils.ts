import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── Tailwind class merge ──────────────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ── Math utilities ────────────────────────────────────────────
/** Linear interpolation */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

// ── String utilities ──────────────────────────────────────────
/** Truncate text with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/** Convert kebab-case to Title Case */
export function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ── DOM utilities ─────────────────────────────────────────────
/** Smooth scroll to an element by selector */
export function scrollToId(id: string, offset = 80): void {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

/** Detect if the device has a coarse pointer (touch) */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  )
}

// ── Date utilities ────────────────────────────────────────────
export function formatYear(date: Date | string): string {
  return new Date(date).getFullYear().toString()
}

// ── Array utilities ───────────────────────────────────────────
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ── CSS variable reader ───────────────────────────────────────
/** Read a CSS custom property from the document root */
export function getCSSVar(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}
