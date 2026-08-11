'use client'

import { Bot, BotOff, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useVoice } from './VoiceProvider.jsx'
import { useSound } from './SoundProvider.jsx'
import VoiceWaveform from './VoiceWaveform.jsx'

export default function VoiceToggle() {
  const { enabled, lang, toggleLang, speaking, toggle, speak, replay } = useVoice()
  const { play } = useSound()

  const handleClick = () => {
    play('toggle')
    const next = !enabled
    toggle()
    if (next) {
      setTimeout(() => {
        speak(
          {
            en: 'Voice guide online. I will narrate each section as you scroll.',
            hi: 'वॉइस गाइड ऑनलाइन है। मैं स्क्रॉल करते ही हर सेक्शन बोलकर सुनाऊँगा।',
          },
          {
            key: 'voice-intro',
            force: true,
          },
        )
      }, 150)
    }
  }

  const handleLangToggle = (e) => {
    e.stopPropagation()
    play('click')
    toggleLang()
    const nextLang = lang === 'en' ? 'hi' : 'en'
    speak(
      nextLang === 'hi'
        ? 'हिंदी भाषा चुनी गई है।'
        : 'English language selected.',
      { key: `lang-switched-${Date.now()}`, force: true },
    )
  }

  const handleReplay = (e) => {
    e.stopPropagation()
    play('click')
    replay()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        className="relative text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        aria-label={enabled ? 'Turn off AI voice narration' : 'Turn on AI voice narration'}
        title={enabled ? 'AI voice on' : 'AI voice off'}
      >
        {enabled ? <Bot size={16} /> : <BotOff size={16} />}
        {speaking && (
          <motion.span
            className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </button>

      {enabled && (
        <>
          <button
            onClick={handleLangToggle}
            className="font-mono text-[11px] sm:text-xs uppercase font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors tracking-wider px-1"
            aria-label={`Switch voice language (currently ${lang.toUpperCase()})`}
            title={`Voice language: ${lang === 'en' ? 'English' : 'Hindi'}. Click to switch.`}
          >
            {lang === 'en' ? 'EN' : 'HI'}
          </button>

          <button
            onClick={handleReplay}
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors hidden sm:inline-flex"
            aria-label="Replay narration"
            title="Replay"
          >
            <RotateCcw size={14} />
          </button>
        </>
      )}

      <VoiceWaveform />
    </div>
  )
}

