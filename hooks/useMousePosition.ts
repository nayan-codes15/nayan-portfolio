'use client'

import { useState, useEffect, useCallback } from 'react'

export interface MousePosition {
  x: number
  y: number
  /** Normalised -1 to 1 relative to viewport centre */
  normX: number
  normY: number
}

const DEFAULT: MousePosition = { x: 0, y: 0, normX: 0, normY: 0 }

/**
 * Tracks the current mouse position and provides both
 * raw pixel values and normalised (-1 to 1) values.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>(DEFAULT)

  const handleMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
      normX: (e.clientX / window.innerWidth)  * 2 - 1,
      normY: (e.clientY / window.innerHeight) * 2 - 1,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  return position
}
