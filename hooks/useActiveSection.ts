'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Tracks which section ID is currently in the viewport
 * using IntersectionObserver. Returns the ID of the most
 * prominently visible section.
 *
 * @param sectionIds  Array of element IDs to observe (order matters)
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')
  // Track which entries are intersecting to pick the best one
  const intersectingRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            intersectingRef.current.set(id, entry.intersectionRatio)
          } else {
            intersectingRef.current.delete(id)
          }
        })

        // Pick the section with the highest intersection ratio
        let bestId = ''
        let bestRatio = 0
        intersectingRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId) setActiveId(bestId)
      },
      {
        // Section is considered "active" when its top third is in the upper half of viewport
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
