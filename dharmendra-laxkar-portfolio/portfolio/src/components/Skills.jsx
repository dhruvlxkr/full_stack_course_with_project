import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const SKILLS = [
  { label: 'Robotics & Control Systems', level: 92 },
  { label: 'Machine Learning / AI', level: 88 },
  { label: 'Embedded Systems (C/C++)', level: 85 },
  { label: 'React & Frontend Engineering', level: 80 },
  { label: 'Computer Vision', level: 83 },
  { label: 'ROS / Simulation', level: 78 },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 02 system.status
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-14">
            Power levels
          </h2>
        </Reveal>

        <div className="space-y-8">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.label} delay={i * 0.06}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-[var(--text)]">
                  {skill.label}
                </span>
                <span className="font-mono text-xs text-[var(--accent)]">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--bg2)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--accent), var(--accent2))',
                    boxShadow: '0 0 10px var(--accent)',
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
