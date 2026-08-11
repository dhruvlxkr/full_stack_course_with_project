'use client'

import Reveal from './Reveal.jsx'
import useSpeakOnView from './useSpeakOnView.js'

const LOG = [
  {
    time: 'Sep 2025 — Present',
    title: 'Full-Stack Developer',
    org: 'BeYoung Folk Private Limited',
    desc: 'Handling and debugging ERP and CRM modules — keeping core business workflows stable, tracing issues across the stack, and shipping fixes and improvements to production systems.',
  },
  {
    time: 'May 2024 — Aug 2025',
    title: 'Associate PHP Laravel & WordPress Developer',
    org: 'Dacnis Tech Solution',
    desc: 'Built a blood donation portal, a dress rental booking system, POS modules for a pharmacy chain (item sales, orders, invoicing), and a custom WordPress hotel booking site.',
  },
]

export default function Timeline() {
  const ref = useSpeakOnView('Section: Signal log. Professional experience at BeYoung Folk and Dacnis Tech Solution.', 'timeline')
  return (
    <section id="log" ref={ref} className="relative py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 04 signal.log
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] mb-10 sm:mb-14">
            Experience
          </h2>
        </Reveal>

        <div
          className="relative pl-7 sm:pl-8 border-l"
          style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}
        >
          {LOG.map((entry, i) => (
            <Reveal key={entry.title + entry.org} delay={i * 0.1} className="relative mb-12 last:mb-0">
              <span
                className="absolute -left-[calc(1.75rem+5px)] sm:-left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
              />
              <p className="font-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-1">{entry.time}</p>
              <h3 className="font-display text-base sm:text-lg text-[var(--text)]">
                {entry.title}{' '}
                <span className="font-body text-sm text-[var(--muted)] font-normal">· {entry.org}</span>
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed max-w-xl">{entry.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
