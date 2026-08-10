import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    name: 'Autonomous Rover',
    tag: 'Robotics · Vision',
    desc: 'A self-navigating rover using LiDAR + camera fusion for obstacle avoidance in unmapped terrain.',
  },
  {
    name: 'NeuraChat',
    tag: 'AI · NLP',
    desc: 'A fine-tuned conversational assistant with tool-use, deployed for internal support workflows.',
  },
  {
    name: 'HomeGrid IoT',
    tag: 'Embedded · Cloud',
    desc: 'A mesh of low-power sensors and an edge controller for adaptive home energy management.',
  },
  {
    name: 'Vision QA Arm',
    tag: 'Robotics · CV',
    desc: 'A robotic arm with a trained defect-detection model for real-time manufacturing quality control.',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 03 build.log
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-14">
            Selected work
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <motion.a
                href="#"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="group relative block h-full rounded-2xl p-7 border overflow-hidden"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--bg2) 70%, transparent)',
                }}
              >
                <div
                  className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(400px circle at var(--x,50%) var(--y,50%), color-mix(in srgb, var(--accent) 15%, transparent), transparent 60%)',
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2">
                      {p.tag}
                    </p>
                    <h3 className="font-display text-xl text-[var(--text)]">
                      {p.name}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    size={20}
                  />
                </div>
                <p className="relative mt-4 text-sm text-[var(--muted)] leading-relaxed">
                  {p.desc}
                </p>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
