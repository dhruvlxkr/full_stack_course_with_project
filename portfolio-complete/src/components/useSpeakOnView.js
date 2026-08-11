'use client'

import { useEffect, useRef } from 'react'
import { useVoice } from './VoiceProvider.jsx'

/**
 * Attach to any section: speaks `text` once, the first time the section is
 * at least ~60% visible — but only while the AI voice is turned on.
 * `text` can be a string, or a function returning a string (evaluated at
 * trigger time, so it can reference what's already been narrated elsewhere).
 */
export default function useSpeakOnView(text, key) {
  const ref = useRef(null)
  const { speak, enabled } = useVoice()

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const isMobile = window.matchMedia('(max-width: 640px)').matches
    // Tall, narrow mobile viewports make 60% trickier to hit while scrolling
    // fast, so we ease the bar slightly there.
    const threshold = isMobile ? 0.4 : 0.6

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const line = typeof text === 'function' ? text() : text
          speak(line, { key })
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, speak, text, key])

  return ref
}
