import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'

/**
 * A small circular 3D portrait that stays pinned to the viewport once the
 * hero has scrolled past, so the "face" of the site is present through the
 * rest of the page. Tilts gently with the cursor for the same 3D feel as
 * the hero portrait, at a much quieter, professional scale.
 */
export default function FloatingPortrait({ src }) {
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 140,
    damping: 16,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 140,
    damping: 16,
  })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50"
          style={{ perspective: 600 }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full"
          >
            <div
              className="absolute -inset-1 rounded-full animate-[spin_6s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--accent), transparent 35%, var(--accent2), transparent 75%, var(--accent))',
              }}
            />
            <div
              className="absolute inset-[3px] rounded-full overflow-hidden border-2"
              style={{ borderColor: 'var(--bg1)' }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
