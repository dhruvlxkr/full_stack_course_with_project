'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useVoice } from './VoiceProvider.jsx'

const BAR_COUNT = 4

export default function VoiceWaveform() {
  const { speaking } = useVoice()

  return (
    <AnimatePresence>
      {speaking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, width: 0 }}
          animate={{ opacity: 1, scale: 1, width: 'auto' }}
          exit={{ opacity: 0, scale: 0.8, width: 0 }}
          className="flex items-center gap-[3px] overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
              animate={{ height: ['4px', '14px', '6px', '16px', '4px'] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.12,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
