'use client'

import Reveal from './Reveal.jsx'
import useSpeakOnView from './useSpeakOnView.js'
import { useVoice } from './VoiceProvider.jsx'
import { useSound } from './SoundProvider.jsx'

const STATS = [
  ['2.5+', 'years experience'],
  ['15+', 'projects shipped'],
  ['2', 'ERP/CRM systems'],
  ['∞', 'debug sessions'],
]

export default function About() {
  const ref = useSpeakOnView(
    "Now that you've met me, let me quickly tell you what I actually build.",
    'about',
  )
  const { speak } = useVoice()
  const { play } = useSound()

  const handleDebugEasterEgg = () => {
    play('click')
    speak('Yes. I stopped counting. Some bugs are features, some features are bugs.', {
      key: 'debug-easter-egg',
    })
  }

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-28 px-5 sm:px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 01 profile.txt
          </p>
        </Reveal> */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight">
            Building reliable systems
            <br /> from database to browser.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            I'm Dharmendra Laxkar — a full-stack developer with 2.5+ years of
            experience building dynamic, scalable, and secure web applications.
            My core strength is PHP &amp; Laravel, and I've extended that into
            CakePHP, React, Next.js, and Node.js to build complete products —
            from ERP and CRM systems to e-commerce platforms and business
            portals. I care about clean code, real-world performance, and
            shipping things that keep working after launch.
          </p>
        </Reveal>

        <div className="mt-14 circuit-line text-[var(--accent)]" />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(([stat, label], i) => {
            const isEasterEgg = stat === '∞'
            return (
              <Reveal key={label} delay={i * 0.08}>
                {isEasterEgg ? (
                  <button
                    onClick={handleDebugEasterEgg}
                    className="text-left cursor-help"
                    title="Yes. I stopped counting."
                  >
                    <p className="font-display text-2xl sm:text-4xl text-[var(--accent)] glow-text">{stat}</p>
                    <p className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--muted)]">
                      {label}
                    </p>
                  </button>
                ) : (
                  <>
                    <p className="font-display text-2xl sm:text-4xl text-[var(--accent)] glow-text">{stat}</p>
                    <p className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--muted)]">
                      {label}
                    </p>
                  </>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
