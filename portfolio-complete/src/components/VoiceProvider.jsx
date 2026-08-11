'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'

const VoiceContext = createContext(null)
const STORAGE_KEY = 'laxkar-voice-enabled'

export function VoiceProvider({ children }) {
  // On by default — browsers still require a user gesture before audio
  // actually plays, so we prime it on the very first click/tap/keypress.
  const [enabled, setEnabled] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const voiceRef = useRef(null)
  const spokenRef = useRef(new Set())
  const lastRef = useRef(null) // { text, key } — for the Replay button

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'false') setEnabled(false)
    } catch {}
  }, [])

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
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

  // Unlock audio on first user gesture (browser autoplay policy)
  useEffect(() => {
    if (unlocked) return
    const unlock = () => {
      if (!('speechSynthesis' in window)) return
      const warm = new SpeechSynthesisUtterance(' ')
      warm.volume = 0
      window.speechSynthesis.speak(warm)
      setUnlocked(true)
    }
    const events = ['pointerdown', 'keydown', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, unlock, { once: true }))
    return () => events.forEach((ev) => window.removeEventListener(ev, unlock))
  }, [unlocked])

  const speak = useCallback(
    (text, { key, force } = {}) => {
      if (!enabled || !('speechSynthesis' in window)) return
      if (key && !force) {
        if (spokenRef.current.has(key)) return
        spokenRef.current.add(key)
      }

      // Latest section always wins — cancel whatever is currently playing
      // or queued so fast scrolling never stacks up narration.
      window.speechSynthesis.cancel()

      const utter = new SpeechSynthesisUtterance(text)
      if (voiceRef.current) utter.voice = voiceRef.current
      utter.pitch = 0.85
      utter.rate = 0.98
      utter.volume = 0.9
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      utter.onerror = () => setSpeaking(false)

      lastRef.current = { text, key }
      window.speechSynthesis.speak(utter)
    },
    [enabled],
  )

  const replay = useCallback(() => {
    if (lastRef.current) speak(lastRef.current.text, { force: true })
  }, [speak])

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const toggle = useCallback(() => {
    setEnabled((e) => {
      const next = !e
      if (!next) stop()
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {}
      return next
    })
  }, [stop])

  const hasSpoken = useCallback((key) => spokenRef.current.has(key), [])

  const value = useMemo(
    () => ({ enabled, speaking, speak, stop, toggle, replay, hasSpoken }),
    [enabled, speaking, speak, stop, toggle, replay, hasSpoken],
  )

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
}

export function useVoice() {
  const ctx = useContext(VoiceContext)
  if (!ctx) {
    return {
      enabled: false,
      speaking: false,
      speak: () => {},
      stop: () => {},
      toggle: () => {},
      replay: () => {},
      hasSpoken: () => false,
    }
  }
  return ctx
}
