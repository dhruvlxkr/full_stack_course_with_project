'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import useSpeakOnView from './useSpeakOnView.js'
import { useSound } from './SoundProvider.jsx'
import {
  Code2,
  Layout,
  Layers,
  Palette,
  Server,
  Cpu,
  Terminal,
  Workflow,
  Database,
  HardDrive,
  GitBranch,
  Globe,
} from 'lucide-react'

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools & Other']

const SKILLS = [
  { label: 'JavaScript', level: 85, category: 'Frontend', icon: Code2 },
  { label: 'React.js', level: 80, category: 'Frontend', icon: Layout },
  { label: 'Next.js', level: 78, category: 'Frontend', icon: Layers },
  { label: 'Tailwind CSS / Bootstrap', level: 88, category: 'Frontend', icon: Palette },
  { label: 'PHP', level: 92, category: 'Backend', icon: Server },
  { label: 'Laravel', level: 90, category: 'Backend', icon: Cpu },
  { label: 'CakePHP', level: 80, category: 'Backend', icon: Terminal },
  { label: 'Node.js', level: 75, category: 'Backend', icon: Workflow },
  { label: 'MySQL', level: 88, category: 'Database', icon: Database },
  { label: 'SQL', level: 86, category: 'Database', icon: HardDrive },
  { label: 'Git & GitHub', level: 85, category: 'Tools & Other', icon: GitBranch },
  { label: 'WordPress', level: 82, category: 'Tools & Other', icon: Globe },
]

function SkillCard({ skill }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const Icon = skill.icon || Code2

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
        className="rounded-xl p-4 sm:p-4.5 border"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
          backgroundColor: 'color-mix(in srgb, var(--bg2) 55%, transparent)',
        }}
      >
        <div className="flex items-center justify-between mb-2.5" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center gap-2">
            <Icon className="text-[var(--accent)] shrink-0" size={16} />
            <span className="font-mono text-sm text-[var(--text)] font-medium">{skill.label}</span>
          </div>
          <span className="font-mono text-xs text-[var(--accent)] font-semibold">{skill.level}%</span>
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
  const [activeTab, setActiveTab] = useState('Frontend')
  const { play } = useSound()

  const ref = useSpeakOnView(
    {
      en: 'Skills and Technical Stack: My core backend strength lies in PHP and Laravel development, where I architect complex relational databases, RESTful APIs, and automated business workflows. Additionally, my skills cover CakePHP, MySQL query optimization, JavaScript, React.js, Next.js, Node.js, Bootstrap, Tailwind CSS, and WordPress theme and plugin customization.',
      hi: 'तकनीकी क्षमताएँ और स्किल्स: मेरी मुख्य बैकएंड ताक़त PHP और लारावेल डेवलपमेंट में है, जहाँ मैं जटिल डेटाबेस आर्किटेक्चर, REST APIs और ऑटोमेटेड बिज़नेस वर्कफ़्लो डिज़ाइन करता हूँ। इसके अतिरिक्त मुझे MySQL, जावास्क्रिप्ट, रिएक्ट, नेक्स्ट जेएस, नोड जेएस, बूटस्ट्रैप और वर्डप्रेस डेवलपमेंट का गहरा अनुभव है।',
    },
    'skills',
  )

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((s) => s.category === activeTab)
  }, [activeTab])

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-28 px-5 sm:px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] mb-6">
            Power levels
          </h2>
        </Reveal>

        {/* Interactive Category Tabs */}
        <Reveal delay={0.15}>
          <div className="flex items-center gap-2 flex-wrap mb-10 sm:mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  play('click')
                  setActiveTab(category)
                }}
                className="px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider border transition-all"
                style={{
                  borderColor:
                    activeTab === category
                      ? 'var(--accent)'
                      : 'color-mix(in srgb, var(--muted) 30%, transparent)',
                  color: activeTab === category ? 'var(--accent)' : 'var(--muted)',
                  backgroundColor:
                    activeTab === category ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
                  boxShadow: activeTab === category ? '0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)' : 'none',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Animated Skill Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.label}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
