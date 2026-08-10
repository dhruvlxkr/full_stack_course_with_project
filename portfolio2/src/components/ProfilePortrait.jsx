import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'

/**
 * A 3D "hologram card" style portrait.
 * - Tilts toward the cursor (mouse parallax) using a real CSS 3D perspective.
 * - Rotates and lifts further as the hero scrolls past, so it visibly reacts
 *   to scrolling, not just hovering.
 * - Layered depth: glow ring (back), photo (mid), HUD frame corners (front)
 *   each translate on a different Z plane for a genuine 3D feel.
 */
export default function ProfilePortrait({ src, sectionRef }) {
  const cardRef = useRef(null)

  // Mouse-driven tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 18,
  })

  // Scroll-driven motion (reacts as the hero section scrolls out of view)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scrollRotateY = useTransform(scrollYProgress, [0, 1], [0, 22])
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      style={{ y: scrollY, scale: scrollScale, opacity: scrollOpacity }}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]"
    >
      <div style={{ perspective: 1200 }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY: useTransform(
              [rotateY, scrollRotateY],
              ([a, b]) => a + b,
            ),
            transformStyle: 'preserve-3d',
          }}
          className="relative aspect-[5/6] rounded-[1.75rem]"
        >
          {/* Back glow plane */}
          <motion.div
            style={{
              transform: 'translateZ(-40px)',
              background:
                'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)',
            }}
            className="absolute -inset-4 rounded-[2rem] animate-pulseGlow"
            aria-hidden="true"
          />

          {/* Rotating conic ring, sits behind the photo */}
          <div
            style={{ transform: 'translateZ(-20px)' }}
            className="absolute -inset-2 rounded-[1.9rem] opacity-70"
          >
            <div className="w-full h-full rounded-[1.9rem] animate-[spin_10s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--accent), transparent 30%, var(--accent2), transparent 70%, var(--accent))',
                WebkitMask:
                  'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
              }}
            />
          </div>

          {/* Photo plane */}
          <div
            style={{
              transform: 'translateZ(0px)',
              borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)',
            }}
            className="absolute inset-0 rounded-[1.75rem] overflow-hidden border"
          >
            <img
              src={src}
              alt="Dharmendra Laxkar"
              className="w-full h-full object-cover"
              draggable="false"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--bg1) 75%, transparent) 100%)',
              }}
            />
            {/* faint scanlines for the robotic / cinematic read */}
            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
              }}
            />
          </div>

          {/* Front HUD corner brackets — floats above the photo in Z */}
          <div
            style={{ transform: 'translateZ(36px)' }}
            className="absolute inset-3 pointer-events-none"
          >
            {[
              'top-0 left-0 border-t border-l rounded-tl-xl',
              'top-0 right-0 border-t border-r rounded-tr-xl',
              'bottom-0 left-0 border-b border-l rounded-bl-xl',
              'bottom-0 right-0 border-b border-r rounded-br-xl',
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute w-6 h-6 text-[var(--accent)] ${pos}`}
                style={{ borderColor: 'var(--accent)', opacity: 0.8 }}
              />
            ))}
          </div>

          {/* Status chip, also floating forward */}
          <div
            style={{
              transform: 'translateZ(48px)',
              backgroundColor: 'color-mix(in srgb, var(--bg2) 90%, transparent)',
              borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
            }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border font-mono text-[10px] uppercase tracking-widest whitespace-nowrap"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
              style={{ background: '#3EFF8B', boxShadow: '0 0 6px #3EFF8B' }}
            />
            <span className="align-middle text-[var(--text)]">available for work</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
