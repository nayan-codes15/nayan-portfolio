'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={sectionRef} className="section-py relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
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
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 gradient-text-static"
          >
            What I've Built and Learned
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Exploring complex concepts through hands-on development.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-[var(--text-muted)] italic">
            Projects reflect learning-stage work. I am actively building more projects.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
