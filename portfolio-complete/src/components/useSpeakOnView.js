'use client'

import { useEffect, useRef } from 'react'
import { useVoice } from './VoiceProvider.jsx'

/**
 * Attach to any section: speaks `text` once, the first time the section is
 * visible — but only while the AI voice is turned on.
 * `text` can be a string, object { en, hi }, or a function returning one of those.
 */
export default function useSpeakOnView(text, key) {
  const ref = useRef(null)
  const { speak, enabled } = useVoice()

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const line = typeof text === 'function' ? text() : text
          speak(line, { key })
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, speak, text, key])

  return ref
}


