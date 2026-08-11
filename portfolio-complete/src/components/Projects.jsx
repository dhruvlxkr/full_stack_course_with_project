'use client'

import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { ArrowUpRight, Volume2 } from 'lucide-react'
import { useSound } from './SoundProvider.jsx'
import { useVoice } from './VoiceProvider.jsx'
import useSpeakOnView from './useSpeakOnView.js'

const PROJECTS = [
  {
    name: 'Medical Store ERP',
    category: 'PHP',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    desc: 'POS modules, item sales, orders, invoice generation, and record maintenance for a pharmacy chain.',
    url: 'http://totalcarepharmacy.store/portal/',
  },
  {
    name: 'Total Care Pharmacy',
    category: 'PHP',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    desc: 'The public-facing e-commerce site for the pharmacy, built alongside its ERP backend.',
    url: 'https://totalcarepharmacy.store/',
  },
  {
    name: 'Shubh Vivah',
    category: 'PHP',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    desc: 'A dress rental portal handling booking, billing, delivery, return, and rent tracking.',
    url: 'https://shubhvivahethnic.com/index.php',
  },
  {
    name: 'School Management ERP',
    category: 'PHP',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    desc: 'An ERP system for day-to-day school administration and record management.',
    url: 'https://aadinathschool.in/',
  },
  {
    name: 'NS Jewellers — Ledger',
    category: 'PHP',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    desc: 'Inventory and ledger tracking system for a jewellery business.',
    url: 'https://nsjewellers1990.com/Ledger/',
  },
  {
    name: 'NS Jewellers — Billing',
    category: 'PHP',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    desc: 'A companion billing portal for point-of-sale invoicing.',
    url: 'https://nsjewellers1990.com/Billing/',
  },
  {
    name: 'Home Town Resort',
    category: 'WordPress',
    tags: ['WordPress'],
    desc: 'A custom-themed hotel booking website with integrated reservation flow.',
    url: 'https://hometownresort.in/',
  },
  {
    name: 'Kargitech Ecommerce',
    category: 'WordPress',
    tags: ['WordPress'],
    desc: 'An e-commerce storefront built for Kargitech.',
    url: 'https://kargitech.com/',
  },
]

const FILTER_TAGS = ['PHP', 'WordPress']
const HOVER_DELAY = 2000

function ProjectCard({ p, index }) {
  const { play } = useSound()
  const { speak } = useVoice()
  const hoverTimer = useRef(null)

  const narrate = (force = false) => {
    speak(`You're looking at ${p.name}. ${p.desc}`, { key: `project-${p.name}`, force })
  }

  const handleEnter = () => {
    play('hover')
    hoverTimer.current = setTimeout(() => narrate(false), HOVER_DELAY)
  }
  const handleLeave = () => {
    clearTimeout(hoverTimer.current)
  }

  return (
    <Reveal delay={index * 0.06}>
      <motion.div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="group relative block h-full rounded-2xl p-6 sm:p-7 border overflow-hidden"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
          backgroundColor: 'color-mix(in srgb, var(--bg2) 70%, transparent)',
        }}
      >
        <div
          className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(400px circle at 50% 50%, color-mix(in srgb, var(--accent) 15%, transparent), transparent 60%)',
          }}
        />
        <div className="relative flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2">
              {p.tags.join(' · ')}
            </p>
            <h3 className="font-display text-lg sm:text-xl text-[var(--text)]">{p.name}</h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault()
                play('click')
                narrate(true)
              }}
              aria-label={`Tell me about ${p.name}`}
              title="Tell me about this project"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <Volume2 size={16} />
            </button>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => play('click')}
              aria-label={`Open ${p.name}`}
            >
              <ArrowUpRight
                className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                size={20}
              />
            </a>
          </div>
        </div>
        <p className="relative mt-4 text-sm text-[var(--muted)] leading-relaxed">{p.desc}</p>
      </motion.div>
    </Reveal>
  )
}

export default function Projects() {
  const [activeTag, setActiveTag] = useState('PHP')
  const { play } = useSound()

  const ref = useSpeakOnView(
    {
      en: 'Selected Real-World Projects: Featured builds under PHP include Total Care Pharmacy ERP and POS modules, Shubh Vivah dress rental portal, School Management ERP, NS Jewellers ledger, and NS Jewellers billing portals. Featured WordPress builds include Home Town Resort hotel booking portal and Kargitech E-commerce storefront.',
      hi: 'चुनिंदा लाइव प्रोजेक्ट्स: PHP के तहत मुख्य रूप से टोटल केयर फार्मेसी ERP और POS बिलिंग सिस्टम, शुभ विवाह ड्रेस रेंटल पोर्टल, स्कूल मैनेजमेंट ERP, NS ज्वेलर्स लेजर और बिलिंग एप्लीकेशन शामिल हैं। वर्डप्रेस के तहत होम टाउन रिसॉर्ट और कारगीटेक पोर्टल शामिल हैं।',
    },
    'projects',
  )

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => p.category === activeTag || p.tags.includes(activeTag))
  }, [activeTag])

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-28 px-5 sm:px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] mb-6">
            Selected work
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  play('click')
                  setActiveTag(tag)
                }}
                className="px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider border transition-all"
                style={{
                  borderColor:
                    activeTag === tag
                      ? 'var(--accent)'
                      : 'color-mix(in srgb, var(--muted) 30%, transparent)',
                  color: activeTag === tag ? 'var(--accent)' : 'var(--muted)',
                  backgroundColor:
                    activeTag === tag ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
                  boxShadow: activeTag === tag ? '0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)' : 'none',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard p={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--muted)] font-mono text-sm mt-10">
            No projects match that filter.
          </p>
        )}
      </div>
    </section>
  )
}

