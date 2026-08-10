import { createContext, useContext, useMemo, useRef, useState, useCallback } from 'react'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      ctxRef.current = new AC()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }, [])

  // Short synthesized beep — frequency/duration vary by "kind" for a bit of texture
  const play = useCallback(
    (kind = 'hover') => {
      if (!enabled) return
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      const presets = {
        hover: { freq: 880, duration: 0.05, gain: 0.03, type: 'sine' },
        click: { freq: 520, duration: 0.09, gain: 0.06, type: 'square' },
        toggle: { freq: 660, duration: 0.12, gain: 0.05, type: 'triangle' },
      }
      const p = presets[kind] || presets.hover

      osc.type = p.type
      osc.frequency.setValueAtTime(p.freq, ctx.currentTime)
      gain.gain.setValueAtTime(p.gain, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + p.duration)

      osc.start()
      osc.stop(ctx.currentTime + p.duration)
    },
    [enabled, getCtx],
  )

  const toggle = useCallback(() => {
    setEnabled((e) => {
      const next = !e
      if (next) getCtx() // unlock audio context on user gesture
      return next
    })
  }, [getCtx])

  const value = useMemo(() => ({ enabled, play, toggle }), [enabled, play, toggle])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    // Safe no-op fallback if used outside the provider
    return { enabled: false, play: () => {}, toggle: () => {} }
  }
  return ctx
}
