'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import useSpeakOnView from './useSpeakOnView.js'

const SKILLS = [
  { label: 'PHP', level: 92 },
  { label: 'Laravel', level: 90 },
  { label: 'CakePHP', level: 78 },
  { label: 'MySQL', level: 85 },
  { label: 'JavaScript', level: 82 },
  { label: 'React.js', level: 78 },
  { label: 'Next.js', level: 75 },
  { label: 'Node.js', level: 72 },
  { label: 'Bootstrap / Tailwind', level: 85 },
  { label: 'WordPress', level: 80 },
]

function SkillCard({ skill }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div style={{ perspective: 600 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="rounded-xl p-5 border"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
          backgroundColor: 'color-mix(in srgb, var(--bg2) 55%, transparent)',
        }}
      >
        <div className="flex items-center justify-between mb-2" style={{ transform: 'translateZ(20px)' }}>
          <span className="font-mono text-sm text-[var(--text)]">{skill.label}</span>
          <span className="font-mono text-xs text-[var(--accent)]">{skill.level}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--bg1)] overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))', boxShadow: '0 0 10px var(--accent)' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const ref = useSpeakOnView(
    'Section: System status. Core skills include P H P, Laravel, React, Next js, and Node js.',
    'skills',
  )
  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 02 system.status
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] mb-10 sm:mb-14">
            Power levels
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.label} delay={i * 0.05}>
              <SkillCard skill={skill} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
