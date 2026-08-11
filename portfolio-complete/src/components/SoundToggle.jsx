'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useSound } from './SoundProvider.jsx'
import { useVoice } from './VoiceProvider.jsx'

export default function SoundToggle() {
  const { enabled: soundEnabled, toggle: toggleSound, play } = useSound()
  const { enabled: voiceEnabled, toggle: toggleVoice, stop: stopVoice } = useVoice()

  const isActive = soundEnabled || voiceEnabled

  const handleToggle = () => {
    if (isActive) {
      if (soundEnabled) toggleSound()
      if (voiceEnabled) toggleVoice()
      stopVoice()
    } else {
      if (!soundEnabled) toggleSound()
      if (!voiceEnabled) toggleVoice()
      setTimeout(() => play('toggle'), 30)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
      aria-label={isActive ? 'Mute all sound & AI voice' : 'Unmute all sound & AI voice'}
      title={isActive ? 'Volume & AI Voice: ON (Click to Mute All)' : 'Volume & AI Voice: OFF (Click to Unmute All)'}
    >
      {isActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}

