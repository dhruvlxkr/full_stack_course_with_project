'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'

const VoiceContext = createContext(null)

export function VoiceProvider({ children }) {
  const [enabled, setEnabled] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const voiceRef = useRef(null)
  const spokenRef = useRef(new Set())

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return
      const preferredNames = ['Google UK English Male', 'Microsoft David', 'Daniel', 'Alex']
      const match =
        voices.find((v) => preferredNames.some((n) => v.name.includes(n))) ||
        voices.find((v) => v.lang?.startsWith('en')) ||
        voices[0]
      voiceRef.current = match
    }

    pickVoice()
    window.speechSynthesis.onvoiceschanged = pickVoice
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const speak = useCallback(
    (text, { key, force } = {}) => {
      if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return
      if (key && !force) {
        if (spokenRef.current.has(key)) return
        spokenRef.current.add(key)
      }

      const utter = new SpeechSynthesisUtterance(text)
      if (voiceRef.current) utter.voice = voiceRef.current
      utter.pitch = 0.85
      utter.rate = 0.98
      utter.volume = 0.9
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      utter.onerror = () => setSpeaking(false)

      window.speechSynthesis.speak(utter)
    },
    [enabled],
  )

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const toggle = useCallback(() => {
    setEnabled((e) => {
      const next = !e
      if (!next) stop()
      return next
    })
  }, [stop])

  const value = useMemo(
    () => ({ enabled, speaking, speak, stop, toggle }),
    [enabled, speaking, speak, stop, toggle],
  )

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
}

export function useVoice() {
  const ctx = useContext(VoiceContext)
  if (!ctx) {
    return { enabled: false, speaking: false, speak: () => {}, stop: () => {}, toggle: () => {} }
  }
  return ctx
}
