import Reveal from './Reveal.jsx'

const LOG = [
  {
    time: '2024 — now',
    title: 'Senior Robotics Engineer',
    org: 'Independent / Freelance',
    desc: 'Designing autonomous navigation stacks and AI-driven perception for field robots.',
  },
  {
    time: '2022 — 2024',
    title: 'AI Engineer',
    org: 'Applied ML Team',
    desc: 'Shipped production ML models for vision and language, from prototype to deployment.',
  },
  {
    time: '2020 — 2022',
    title: 'Embedded Systems Developer',
    org: 'Hardware Startup',
    desc: 'Built firmware and control loops for real-time embedded devices.',
  },
]

export default function Timeline() {
  return (
    <section id="log" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 04 signal.log
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-14">
            Experience
          </h2>
        </Reveal>

        <div className="relative pl-8 border-l" style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}>
          {LOG.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 0.1} className="relative mb-12 last:mb-0">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
              />
              <p className="font-mono text-xs tracking-widest uppercase text-[var(--muted)] mb-1">
                {entry.time}
              </p>
              <h3 className="font-display text-lg text-[var(--text)]">
                {entry.title}{' '}
                <span className="font-body text-sm text-[var(--muted)] font-normal">
                  · {entry.org}
                </span>
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed max-w-xl">
                {entry.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
