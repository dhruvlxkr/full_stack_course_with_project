'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { useSound } from './SoundProvider.jsx'
import { useVoice } from './VoiceProvider.jsx'

const SOCIALS = [
  { icon: Linkedin, href: 'https://in.linkedin.com/in/dharmendra-laxkar-2932a5167', label: 'LinkedIn', angle: 175 },
  { icon: Github, href: 'https://github.com/dhruvlxkr', label: 'GitHub', angle: 152 },
  { icon: Instagram, href: 'https://www.instagram.com/heart_hacked_420/', label: 'Instagram', angle: 128 },
  { icon: Mail, href: 'mailto:dharmendralxkr@gmail.com', label: 'Email', angle: 105 },
]

const RADIUS = 76

export default function FloatingPortrait({ src }) {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { play } = useSound()
  const { speaking } = useVoice()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 16 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 16 })

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

  const toggleOpen = () => {
    play('toggle')
    setOpen((o) => !o)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-5 sm:right-6 z-50"
        >
          {/* Radial social icons */}
          <AnimatePresence>
            {open &&
              SOCIALS.map(({ icon: Icon, href, label, angle }, i) => {
                const rad = (angle * Math.PI) / 180
                const dx = Math.cos(rad) * RADIUS
                const dy = -Math.sin(rad) * RADIUS
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onMouseEnter={() => play('hover')}
                    onClick={() => play('click')}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ x: dx, y: dy, opacity: 1, scale: 1 }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.04 }}
                    className="absolute bottom-7 right-7 sm:bottom-8 sm:right-8 w-11 h-11 rounded-full flex items-center justify-center border shadow-lg"
                    style={{
                      backgroundColor: 'var(--bg2)',
                      borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)',
                      color: 'var(--accent)',
                    }}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
          </AnimatePresence>

          {/* Center avatar button */}
          <motion.button
            onClick={toggleOpen}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label={open ? 'Close social links' : 'Open social links'}
            style={{ perspective: 600 }}
            className="relative block"
          >
            <motion.div
              style={{ rotateX, rotateY, boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full"
            >
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, var(--accent), transparent 35%, var(--accent2), transparent 75%, var(--accent))',
                  animation: `spin ${speaking ? '2s' : '6s'} linear infinite`,
                }}
              />
              <div className="absolute inset-[3px] rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--bg1)' }}>
                <Image src={src} alt="" fill sizes="64px" className="object-cover" draggable="false" />
              </div>
              {/* small + / x indicator */}
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg1)' }}
              >
                {open ? '×' : '+'}
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
