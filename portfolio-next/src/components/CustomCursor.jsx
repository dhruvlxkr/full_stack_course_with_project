'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 })
  const rx = useSpring(x, { stiffness: 200, damping: 30, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 200, damping: 30, mass: 0.6 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target
      setHovering(!!target.closest('a, button, [role="button"], input, textarea'))
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.classList.add('cursor-none-custom')

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.classList.remove('cursor-none-custom')
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
      <motion.div
        style={{ left: sx, top: sy, backgroundColor: 'var(--accent)' }}
        animate={{ scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        style={{ left: rx, top: ry, borderColor: 'var(--accent)' }}
        animate={{ scale: hovering ? 1.6 : 1, rotate: hovering ? 45 : 0, opacity: hovering ? 1 : 0.7 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8"
      >
        <span className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-2" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-2" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-2" style={{ backgroundColor: 'var(--accent)' }} />
        <span className="absolute top-1/2 right-0 -translate-y-1/2 h-px w-2" style={{ backgroundColor: 'var(--accent)' }} />
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: 'inherit', opacity: 0.5 }} />
      </motion.div>
    </div>
  )
}
