'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin spring-animated scroll progress bar pinned at the very top of the page.
 * Colour comes from --gradient-brand so it matches the active theme.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--gradient-brand)',
        transformOrigin: '0%',
        zIndex: 10000,
      }}
    />
  )
}
