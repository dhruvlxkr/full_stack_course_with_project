import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

// The sun/moon travels along a real arc — like a day/night cycle —
// instead of a flat sliding switch. This is the page's signature control.
export default function DayNightToggle({ theme, setTheme }) {
  const isDay = theme === 'day'

  // Arc path from left horizon to right horizon
  const arcPath = 'M 6 34 A 28 28 0 0 1 62 34'

  return (
    <button
      onClick={() => setTheme(isDay ? 'night' : 'day')}
      className="relative w-16 h-9 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
      aria-label={isDay ? 'Switch to night mode' : 'Switch to day mode'}
      title={isDay ? 'Day' : 'Night'}
    >
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
