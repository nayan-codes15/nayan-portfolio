'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true only after the component has mounted on the client.
 * Use this to guard any code that uses browser APIs (window, document, etc.)
 * and prevent hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return mounted
}
