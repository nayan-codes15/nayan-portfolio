'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin once — safe to call multiple times
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GSAPContextRef {
  ctx: gsap.Context | null
}

/**
 * Provides a GSAP context tied to a container ref.
 * Automatically cleans up animations on unmount.
 *
 * @param callback  GSAP animation setup function — receives gsap instance
 * @param containerRef  Ref to the container element (scope for GSAP selectors)
 * @param deps  Dependency array, like useEffect
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null)
 * useGSAP((gsap) => {
 *   gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1 })
 * }, containerRef)
 */
export function useGSAP(
  callback: (gsapInstance: typeof gsap) => void,
  containerRef: RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
): void {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create scoped GSAP context
    ctxRef.current = gsap.context(() => {
      callback(gsap)
    }, containerRef.current)

    return () => {
      ctxRef.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Register GSAP ScrollTrigger once on mount.
 * Call this in a top-level component (e.g., layout) to ensure
 * ScrollTrigger is always registered before any animations run.
 */
export function useScrollTriggerSetup(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Refresh on resize for correct trigger positions
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}

export { gsap, ScrollTrigger }
