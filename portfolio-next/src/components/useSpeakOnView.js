'use client'

import { useEffect, useRef } from 'react'
import { useVoice } from './VoiceProvider.jsx'

export default function useSpeakOnView(text, key) {
  const ref = useRef(null)
  const { speak, enabled } = useVoice()

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) speak(text, { key })
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, speak, text, key])

  return ref
}
