import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'BOOT SEQUENCE INITIATED',
  'LOADING IDENTITY MODULE... OK',
  'CALIBRATING VISION SYSTEMS... OK',
  'LAXKAR_OS READY',
]

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const total = 1400
    const start = performance.now()
    let raf
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / total) * 100)
      setProgress(pct)
      setLineIndex(Math.min(LINES.length - 1, Math.floor((pct / 100) * LINES.length)))
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          onDone && onDone()
        }, 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--bg1)' }}
        >
          <div className="font-display text-2xl tracking-[0.3em] uppercase mb-8" style={{ color: 'var(--text)' }}>
            D<span style={{ color: 'var(--accent)' }}>.</span>LAXKAR
          </div>

          <div className="font-mono text-[11px] uppercase tracking-widest h-5" style={{ color: 'var(--accent)' }}>
            {LINES[lineIndex]}
          </div>

          <div
            className="mt-6 w-56 sm:w-72 h-[3px] rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--bg2)' }}
          >
            <motion.div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                boxShadow: '0 0 8px var(--accent)',
              }}
            />
          </div>
          <div className="mt-2 font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
            {Math.floor(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
