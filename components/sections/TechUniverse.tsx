'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { TECH_ITEMS, CATEGORY_COLORS } from '@/data/techItems'

// Lazy load the 3D globe to prevent hydration issues and improve performance
const TechGlobe = dynamic(() => import('@/components/3d/TechGlobe'), { ssr: false })

const TechUniverse = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="tech-universe" ref={sectionRef} className="section-py relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              background: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
              color: 'var(--accent-1)',
              border: '1px solid color-mix(in srgb, var(--accent-1) 25%, transparent)'
            }}
          >
            Tech Universe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black mb-4 gradient-text-static"
          >
            Technologies I Work With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            An interactive visualization of my technical ecosystem. Drag to explore.
          </motion.p>
        </div>

        {/* 3D Globe - Hidden on Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hidden md:block w-full h-[600px] relative z-0"
        >
          {isInView && <TechGlobe />}
        </motion.div>

        {/* 2D Tag Cloud - Mobile Fallback */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="md:hidden flex flex-wrap justify-center gap-3 mt-8"
        >
          {TECH_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + (i * 0.05) }}
              className="px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
              style={{
                background: `color-mix(in srgb, ${CATEGORY_COLORS[item.category]} 15%, var(--bg-card))`,
                border: `1px solid ${CATEGORY_COLORS[item.category]}`,
                color: CATEGORY_COLORS[item.category]
              }}
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default React.memo(TechUniverse)
