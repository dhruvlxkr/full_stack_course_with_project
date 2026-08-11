'use client'

import { Bot, BotOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useVoice } from './VoiceProvider.jsx'
import { useSound } from './SoundProvider.jsx'

export default function VoiceToggle() {
  const { enabled, speaking, toggle, speak } = useVoice()
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

  return (
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
  )
}
