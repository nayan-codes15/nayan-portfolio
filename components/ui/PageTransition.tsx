'use client'

import { motion, Variants } from 'framer-motion'
import type { WithChildren } from '@/types'

const variants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

/** Wraps page content with a subtle fade-up entrance. Used in the root layout. */
export function PageTransition({ children }: WithChildren) {
  return (
    <motion.div variants={variants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}
