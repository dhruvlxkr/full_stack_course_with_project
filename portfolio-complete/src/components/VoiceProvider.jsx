'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'

const VoiceContext = createContext(null)
const STORAGE_KEY = 'laxkar-voice-enabled'
const LANG_STORAGE_KEY = 'laxkar-voice-lang'

export function VoiceProvider({ children }) {
  const [enabled, setEnabled] = useState(true)
  const [lang, setLangState] = useState('en') // 'en' or 'hi'
  const [speaking, setSpeaking] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const voiceRef = useRef(null)
  const pendingSpeechRef = useRef(null)
  const spokenRef = useRef(new Set())
  const lastRef = useRef(null) // { textInput, options } — for the Replay button

  useEffect(() => {
    try {
      const savedEnabled = localStorage.getItem(STORAGE_KEY)
      if (savedEnabled === 'false') setEnabled(false)

      const savedLang = localStorage.getItem(LANG_STORAGE_KEY)
      if (savedLang === 'hi' || savedLang === 'en') setLangState(savedLang)
    } catch {}
  }, [])

  const setLang = useCallback((newLang) => {
    setLangState(newLang)
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang)
    } catch {}
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'hi' : 'en'
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next)
      } catch {}
      return next
    })
  }, [])

  const speak = useCallback(
    (textInput, { key, force } = {}) => {
      if (!enabled || !('speechSynthesis' in window)) return

      let textToSpeak = ''
      if (typeof textInput === 'object' && textInput !== null) {
        textToSpeak = textInput[lang] || textInput.en || textInput.hi || ''
      } else {
        textToSpeak = String(textInput || '')
      }

      if (!textToSpeak.trim()) return

      if (key && !force) {
        if (spokenRef.current.has(key)) return
        spokenRef.current.add(key)
      }

      lastRef.current = { textInput, options: { key, force } }

      // Queue speech if not unlocked yet (browser autoplay policy)
      if (!unlocked) {
        pendingSpeechRef.current = { textInput, options: { key, force } }
      }

      // Latest section always wins — cancel whatever is currently playing
      try {
        window.speechSynthesis.cancel()
      } catch {}

      const utter = new SpeechSynthesisUtterance(textToSpeak)
      utter.lang = lang === 'hi' ? 'hi-IN' : 'en-US'

      if (voiceRef.current) utter.voice = voiceRef.current
      utter.pitch = lang === 'hi' ? 0.95 : 0.85
      utter.rate = lang === 'hi' ? 0.92 : 0.98
      utter.volume = 1.0

      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      utter.onerror = () => setSpeaking(false)

      try {
        window.speechSynthesis.speak(utter)
      } catch {
        pendingSpeechRef.current = { textInput, options: { key, force } }
      }
    },
    [enabled, lang, unlocked],
  )

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return

      let match = null
      if (lang === 'hi') {
        match =
          voices.find((v) => v.lang?.startsWith('hi') || v.name.toLowerCase().includes('hindi')) ||
          voices.find((v) => v.name.includes('Google हिन्दी') || v.name.includes('Hemant') || v.name.includes('Kalpana'))
      }

      if (!match) {
        const preferredNames = ['Google UK English Male', 'Microsoft David', 'Daniel', 'Alex', 'Google US English']
        match =
          voices.find((v) => preferredNames.some((n) => v.name.includes(n))) ||
          voices.find((v) => v.lang?.startsWith('en')) ||
          voices[0]
      }

      voiceRef.current = match

      if (pendingSpeechRef.current && unlocked) {
        const pending = pendingSpeechRef.current
        pendingSpeechRef.current = null
        setTimeout(() => speak(pending.textInput, { ...pending.options, force: true }), 50)
      }
    }

    pickVoice()
    window.speechSynthesis.onvoiceschanged = pickVoice
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [lang, unlocked, speak])

  // Unlock audio on ANY initial gesture or movement (browser autoplay policy)
  useEffect(() => {
    const unlock = () => {
      if (!('speechSynthesis' in window)) return
      try {
        const warm = new SpeechSynthesisUtterance(' ')
        warm.volume = 0
        window.speechSynthesis.speak(warm)
      } catch {}
      setUnlocked(true)

      if (pendingSpeechRef.current) {
        const pending = pendingSpeechRef.current
        pendingSpeechRef.current = null
        setTimeout(() => speak(pending.textInput, { ...pending.options, force: true }), 50)
      }
    }

    const events = ['mousemove', 'pointermove', 'pointerdown', 'keydown', 'touchstart', 'scroll', 'click']
    events.forEach((ev) => window.addEventListener(ev, unlock, { once: true, capture: true }))
    return () => events.forEach((ev) => window.removeEventListener(ev, unlock, { capture: true }))
  }, [speak])

  const replay = useCallback(() => {
    if (lastRef.current) speak(lastRef.current.textInput, { ...lastRef.current.options, force: true })
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
    () => ({ enabled, lang, setLang, toggleLang, speaking, speak, stop, toggle, replay, hasSpoken, unlocked }),
    [enabled, lang, setLang, toggleLang, speaking, speak, stop, toggle, replay, hasSpoken, unlocked],
  )

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
}

export function useVoice() {
  const ctx = useContext(VoiceContext)
  if (!ctx) {
    return {
      enabled: false,
      lang: 'en',
      setLang: () => {},
      toggleLang: () => {},
      speaking: false,
      speak: () => {},
      stop: () => {},
      toggle: () => {},
      replay: () => {},
      hasSpoken: () => false,
      unlocked: false,
    }
  }
  return ctx
}


