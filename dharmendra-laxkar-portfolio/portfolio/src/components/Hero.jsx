import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Starfield from './Starfield.jsx'
import TypingText from './TypingText.jsx'
import ProfilePortrait from './ProfilePortrait.jsx'
import profilePhoto from '../assets/profile-placeholder.svg'
import { ChevronDown } from 'lucide-react'

const BOOT_LINES = [
  '> initializing portfolio_core...',
  '> loading identity module: LAXKAR_D',
  '> status: online',
]

export default function Hero({ theme }) {
  const ref = useRef(null)
  const [bootDone, setBootDone] = useState(false)
  const [nameDone, setNameDone] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center"
    >
      <Starfield theme={theme} />

      {/* Vignette + scanline for cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, var(--bg1) 92%)',
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="w-full h-40 bg-[var(--accent)] animate-scan" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-10 items-center"
      >
        <motion.div style={{ y, scale }} className="text-center md:text-left order-2 md:order-1">
          <div className="font-mono text-xs sm:text-sm text-[var(--accent)] space-y-1 mb-6 h-16">
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
              <h1 className="font-display font-black uppercase leading-[0.95] text-[13vw] sm:text-[6vw] md:text-[4.4vw] text-[var(--text)]">
                <TypingText
                  text="DHARMENDRA"
                  speed={70}
                  startDelay={100}
                  cursorClassName="border-[var(--text)]"
                />
                <br />
                <span className="text-[var(--accent)] glow-text">
                  <TypingText
                    text="LAXKAR"
                    speed={70}
                    startDelay={1400}
                    cursorClassName="border-[var(--accent)]"
                    onDone={() => setNameDone(true)}
                  />
                </span>
              </h1>

              {nameDone && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="mt-6 font-mono text-sm sm:text-base tracking-[0.25em] uppercase text-[var(--muted)]">
                    Robotics &amp; AI Engineer
                  </p>
                  <div className="mt-10 flex items-center justify-center md:justify-start gap-4">
                    <a
                      href="#projects"
                      className="px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase bg-[var(--accent)] text-[var(--bg1)] hover:opacity-90 transition-opacity"
                    >
                      View Work
                    </a>
                    <a
                      href="#contact"
                      className="px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase border border-[var(--muted)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      Contact
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
          <ProfilePortrait src={profilePhoto} sectionRef={ref} />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--muted)]"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  )
}
