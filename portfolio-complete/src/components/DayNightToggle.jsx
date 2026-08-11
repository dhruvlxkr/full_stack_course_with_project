'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useSound } from './SoundProvider.jsx'

// The sun/moon travels along a real arc — like a day/night cycle —
// instead of a flat sliding switch. This is the page's signature control.
export default function DayNightToggle({ theme, setTheme }) {
  const isDay = theme === 'day'
  const [burstId, setBurstId] = useState(0)
  const { play } = useSound()

  const arcPath = 'M 6 34 A 28 28 0 0 1 62 34'

  const particles = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2
    return { id: i, x: Math.cos(angle) * 34, y: Math.sin(angle) * 34 }
  })

  const handleClick = () => {
    play('toggle')
    setBurstId((id) => id + 1)
    setTheme(isDay ? 'night' : 'day')
  }

  return (
    <button
      onClick={handleClick}
      className="relative w-16 h-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
      aria-label={isDay ? 'Switch to night mode' : 'Switch to day mode'}
      title={isDay ? 'Day' : 'Night'}
    >
      <AnimatePresence>
        {burstId > 0 && (
          <motion.div key={burstId} className="absolute left-1/2 top-1/2 pointer-events-none">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: isDay ? '#4CF3FF' : '#FF9F45' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox="0 0 68 40" className="w-full h-full overflow-visible">
        <path
          d={arcPath}
          fill="none"
          stroke="var(--muted)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <motion.g
          animate={{ offsetDistance: isDay ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          style={{ offsetPath: `path('${arcPath}')`, offsetRotate: '0deg' }}
        >
          <motion.circle
            r="7"
            fill={isDay ? '#FF9F45' : '#4CF3FF'}
            animate={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
          />
        </motion.g>
      </svg>
      <span className="absolute left-0 top-1 text-[var(--accent2)] opacity-70">
        <Moon size={12} />
      </span>
      <span className="absolute right-0 top-1 text-[var(--accent)] opacity-70">
        <Sun size={12} />
      </span>
    </button>
  )
}
