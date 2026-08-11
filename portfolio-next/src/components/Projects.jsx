'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { ArrowUpRight } from 'lucide-react'
import { useSound } from './SoundProvider.jsx'
import useSpeakOnView from './useSpeakOnView.js'

const PROJECTS = [
  {
    name: 'Medical Store ERP',
    tag: 'PHP · MySQL · Bootstrap',
    desc: 'POS modules, item sales, orders, invoice generation, and record maintenance for a pharmacy chain.',
    url: 'http://totalcarepharmacy.store/portal/',
  },
  {
    name: 'Total Care Pharmacy',
    tag: 'PHP · MySQL · Bootstrap',
    desc: 'The public-facing e-commerce site for the pharmacy, built alongside its ERP backend.',
    url: 'https://totalcarepharmacy.store/',
  },
  {
    name: 'Shubh Vivah',
    tag: 'PHP · MySQL · Bootstrap',
    desc: 'A dress rental portal handling booking, billing, delivery, return, and rent tracking.',
    url: 'https://shubhvivahethnic.com/index.php',
  },
  {
    name: 'School Management ERP',
    tag: 'HTML · CSS · JavaScript',
    desc: 'An ERP system for day-to-day school administration and record management.',
    url: 'https://aadinathschool.in/',
  },
  {
    name: 'NS Jewellers — Ledger',
    tag: 'HTML · CSS · JavaScript',
    desc: 'Inventory and ledger tracking system for a jewellery business.',
    url: 'https://nsjewellers1990.com/Ledger/',
  },
  {
    name: 'NS Jewellers — Billing',
    tag: 'HTML · CSS · JavaScript',
    desc: 'A companion billing portal for point-of-sale invoicing.',
    url: 'https://nsjewellers1990.com/Billing/',
  },
  {
    name: 'Ivory Nepal Inventory',
    tag: 'HTML · CSS · JavaScript',
    desc: 'An inventory portal built for cross-border stock tracking.',
    url: 'https://ivorynepal.in/',
  },
  {
    name: 'Home Town Resort',
    tag: 'WordPress · Elementor',
    desc: 'A custom-themed hotel booking website with integrated reservation flow.',
    url: 'https://hometownresort.in/',
  },
  {
    name: 'Kargitech Ecommerce',
    tag: 'HTML · CSS · JavaScript',
    desc: 'An e-commerce storefront built for Kargitech.',
    url: 'https://kargitech.com/',
  },
]

export default function Projects() {
  const { play } = useSound()
  const ref = useSpeakOnView('Section: Build log. Selected projects, including ERP systems and e-commerce platforms.', 'projects')
  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 03 build.log
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] mb-10 sm:mb-14">
            Selected work
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <motion.a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => play('hover')}
                onClick={() => play('click')}
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
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2">
                      {p.tag}
                    </p>
                    <h3 className="font-display text-lg sm:text-xl text-[var(--text)]">{p.name}</h3>
                  </div>
                  <ArrowUpRight
                    className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
                    size={20}
                  />
                </div>
                <p className="relative mt-4 text-sm text-[var(--muted)] leading-relaxed">{p.desc}</p>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
