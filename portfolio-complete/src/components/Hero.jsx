'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Starfield from './Starfield.jsx'
import TypingText from './TypingText.jsx'
import ProfilePortrait from './ProfilePortrait.jsx'
import { ChevronDown, Download } from 'lucide-react'
import { useSound } from './SoundProvider.jsx'
import { useVoice } from './VoiceProvider.jsx'

const BOOT_LINES = [
  '> initializing portfolio_core...',
  '> loading identity module: LAXKAR_D',
  '> status: online',
]

const PROFILE_PHOTO = '/pic-white.jpg'

export default function Hero({ theme }) {
  const ref = useRef(null)
  const [bootDone, setBootDone] = useState(false)
  const [nameDone, setNameDone] = useState(false)
  const { play } = useSound()
  const { speak } = useVoice()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center py-28 md:py-0">
      <Starfield theme={theme} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg1) 92%)' }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="w-full h-40 bg-[var(--accent)] animate-scan" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl px-5 sm:px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-10 items-center"
      >
        <motion.div style={{ y, scale }} className="text-center md:text-left order-2 md:order-1">
          {/* Always in the DOM for SEO/accessibility — the animated version below is purely decorative */}
          <h1 className="sr-only">Dharmendra Laxkar — PHP, Laravel &amp; Full-Stack Developer</h1>
          <p className="sr-only">ERP &amp; CRM Systems · React · Next.js · Node.js</p>

          <div className="font-mono text-[11px] sm:text-sm text-[var(--accent)] space-y-1 mb-6 h-16">
            {!bootDone && (
              <TypingText
                text={BOOT_LINES.join('\n')}
                speed={18}
                startDelay={200}
                className="whitespace-pre-line opacity-70"
                cursorClassName="border-[var(--accent)]"
                onDone={() => setBootDone(true)}
              />
            )}
          </div>

          {bootDone && (
            <>
              <div
                aria-hidden="true"
                className="font-display font-black uppercase leading-[0.95] text-[clamp(2.4rem,11vw,4.8rem)] md:text-[clamp(2.8rem,4.4vw,5.2rem)] text-[var(--text)] break-words"
              >
                <TypingText text="DHARMENDRA" speed={70} startDelay={100} cursorClassName="border-[var(--text)]" />
                <br />
                <span className="text-[var(--accent)] glow-text">
                  <TypingText
                    text="LAXKAR"
                    speed={70}
                    startDelay={1400}
                    cursorClassName="border-[var(--accent)]"
                    onDone={() => {
                      setNameDone(true)
                      const hour = new Date().getHours()
                      const timeLine =
                        hour < 5
                          ? "Still exploring portfolios this late? Welcome."
                          : hour < 12
                            ? 'Good morning, and welcome.'
                            : hour < 18
                              ? 'Welcome.'
                              : 'Good evening, and welcome.'
                      speak(
                        `${timeLine} I'm Dharmendra Laxkar, a P H P, Laravel, and full stack developer.`,
                        { key: 'hero-welcome' },
                      )
                    }}
                  />
                </span>
              </div>

              {nameDone && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <p className="mt-5 sm:mt-6 font-mono text-xs sm:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[var(--muted)]">
                    PHP, Laravel &amp; Full-Stack Developer
                  </p>
                  <p className="mt-2 font-mono text-[11px] sm:text-sm tracking-widest uppercase text-[var(--muted)] opacity-70">
                    ERP &amp; CRM Systems · React · Next.js · Node.js
                  </p>
                  <div className="mt-8 sm:mt-10 flex items-center justify-center md:justify-start gap-3 sm:gap-4 flex-wrap">
                    <a
                      href="#projects"
                      onMouseEnter={() => play('hover')}
                      onClick={() => play('click')}
                      className="px-5 sm:px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase bg-[var(--accent)] text-[var(--bg1)] hover:opacity-90 transition-opacity"
                    >
                      View Work
                    </a>
                    <a
                      href="#contact"
                      onMouseEnter={() => play('hover')}
                      onClick={() => play('click')}
                      className="px-5 sm:px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase border border-[var(--muted)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      Contact
                    </a>
                    <a
                      href="/Dharmendra Laxkar.pdf"
                      download
                      onMouseEnter={() => play('hover')}
                      onClick={() => play('click')}
                      className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase border border-[var(--muted)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Download size={14} /> Resume
                    </a>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2"
        >
          <ProfilePortrait src={PROFILE_PHOTO} sectionRef={ref} />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--muted)] hidden sm:block"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  )
}
