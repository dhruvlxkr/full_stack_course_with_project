'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVoice } from './VoiceProvider.jsx'
import { useSound } from './SoundProvider.jsx'

const CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
]

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height, columns, drops, raf

    const chars = 'アイウエオカキクケコDHARMENDRALAXKAR01</>{}'.split('')

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / 16)
      drops = Array.from({ length: columns }, () => Math.random() * -50)
    }

    function draw() {
      ctx.fillStyle = 'rgba(5,7,13,0.08)'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#4CF3FF'
      ctx.font = '14px monospace'
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * 16, drops[i] * 16)
        if (drops[i] * 16 > height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}

const TERMINAL_LINES = [
  'dharmendra@portfolio:~$ sudo hire-dharmendra',
  '[sudo] password: ********',
  'Access granted.',
  '',
  'AI: Good choice. 😎',
]

export default function KonamiEasterEgg() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([])
  const progress = useRef(0)
  const { speak } = useVoice()
  const { play } = useSound()

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === CODE[progress.current]) {
        progress.current += 1
        if (progress.current === CODE.length) {
          progress.current = 0
          setOpen(true)
        }
      } else {
        progress.current = e.key === CODE[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) {
      setLines([])
      return
    }
    play('toggle')
    let i = 0
    const interval = setInterval(() => {
      i++
      setLines(TERMINAL_LINES.slice(0, i))
      if (i >= TERMINAL_LINES.length) {
        clearInterval(interval)
        speak('Good choice. Terminal mode activated.', { key: 'konami-egg', force: true })
      }
    }, 500)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center px-6 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <MatrixRain />
          <div className="relative z-10 w-full max-w-lg font-mono text-xs sm:text-sm text-[#4CF3FF] space-y-2 bg-black/60 border border-[#4CF3FF]/30 rounded-lg p-6">
            {lines.map((line, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
            <p className="text-[10px] text-[#8891A8] mt-6">
              press anywhere to exit terminal mode
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
