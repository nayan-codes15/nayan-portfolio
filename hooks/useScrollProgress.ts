'use client'

import { useState, useEffect } from 'react'

/**
 * Returns a value between 0 and 1 representing how far
 * the user has scrolled down the page.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollY  = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}

/**
 * Returns the current scroll Y position in pixels.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const update = () => setScrollY(window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return scrollY
}
