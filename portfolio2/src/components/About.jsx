import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 01 profile.txt
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight">
            Building machines and interfaces
            <br /> that think a step ahead.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            I'm Dharmendra Laxkar — an engineer who works at the seam between
            hardware and intelligence: autonomous systems, embedded control,
            and the AI models that let them make sense of the world. I like
            problems that need a circuit diagram in one hand and a training
            loop in the other.
          </p>
        </Reveal>

        <div className="mt-14 circuit-line text-[var(--accent)]" />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            ['5+', 'years building'],
            ['20+', 'projects shipped'],
            ['8', 'robots in the wild'],
            ['∞', 'debug sessions'],
          ].map(([stat, label], i) => (
            <Reveal key={label} delay={i * 0.08}>
              <p className="font-display text-3xl sm:text-4xl text-[var(--accent)] glow-text">
                {stat}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
                {label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
