'use client'

import { Bot, BotOff, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useVoice } from './VoiceProvider.jsx'
import { useSound } from './SoundProvider.jsx'
import VoiceWaveform from './VoiceWaveform.jsx'

export default function VoiceToggle() {
  const { enabled, speaking, toggle, speak, replay } = useVoice()
  const { play } = useSound()

  const handleClick = () => {
    play('toggle')
    const next = !enabled
    toggle()
    if (next) {
      setTimeout(() => {
        speak('Voice guide online. I will narrate each section as you scroll.', {
          key: 'voice-intro',
          force: true,
        })
      }, 150)
    }
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
        <button
          onClick={handleReplay}
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors hidden sm:inline-flex"
          aria-label="Replay narration"
          title="Replay"
        >
          <RotateCcw size={14} />
        </button>
      )}

      <VoiceWaveform />
    </div>
  )
}
