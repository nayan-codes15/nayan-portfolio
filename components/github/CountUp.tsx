'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

interface CountUpProps {
  from?: number
  to: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}

export default function CountUp({ 
  from = 0, 
  to, 
  duration = 2, 
  delay = 0,
  formatter = (val) => Math.round(val).toString(),
  className = ''
}: CountUpProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node || !inView || hasAnimated) return

    setHasAnimated(true)
    
    // Initial display
    node.textContent = formatter(from)
    
    const controls = animate(from, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(value) {
        if (node) {
          node.textContent = formatter(value)
        }
      }
    })

    return () => controls.stop()
  }, [from, to, duration, delay, inView, formatter, hasAnimated])

  return <span ref={nodeRef} className={className}>{formatter(from)}</span>
}
