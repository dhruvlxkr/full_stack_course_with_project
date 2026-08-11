'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useSound } from './SoundProvider.jsx'

export default function SoundToggle() {
  const { enabled, toggle, play } = useSound()

  return (
    <button
      onClick={() => {
        toggle()
        setTimeout(() => play('toggle'), 30)
      }}
      className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
      aria-label={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
