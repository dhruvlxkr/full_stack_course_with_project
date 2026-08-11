'use client'

import { motion } from 'framer-motion'
import { useSound } from './SoundProvider.jsx'

const WHATSAPP_NUMBER = '916378767914' // country code + number, no + or spaces
const PREFILL = encodeURIComponent("Hi Dharmendra, I found your portfolio and I'd like to connect.")

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.615 4.647 1.782 6.667L2.667 29.333l6.83-1.79a13.27 13.27 0 0 0 6.507 1.657h.006c7.363 0 13.333-5.97 13.333-13.333S23.367 2.667 16.004 2.667Zm0 24.4a11.02 11.02 0 0 1-5.62-1.537l-.403-.24-4.053 1.063 1.083-3.953-.263-.407a11.04 11.04 0 0 1-1.71-5.913c0-6.107 4.966-11.073 11.073-11.073 2.96 0 5.74 1.153 7.83 3.243a11 11 0 0 1 3.243 7.837c-.007 6.107-4.973 10.98-11.08 10.98Zm6.07-8.287c-.333-.167-1.966-.973-2.27-1.083-.303-.11-.526-.167-.75.167-.223.333-.86 1.083-1.053 1.307-.193.223-.39.25-.723.083-.333-.167-1.406-.518-2.678-1.652-.99-.883-1.659-1.974-1.853-2.307-.193-.333-.02-.513.147-.68.15-.15.333-.39.5-.583.167-.193.223-.333.333-.556.11-.223.056-.417-.028-.583-.083-.167-.75-1.807-1.027-2.473-.27-.65-.545-.562-.75-.572l-.64-.011c-.223 0-.583.083-.888.417-.303.333-1.16 1.133-1.16 2.767s1.187 3.21 1.353 3.43c.167.223 2.337 3.567 5.663 5.003.79.34 1.407.544 1.888.696.793.253 1.514.217 2.084.132.636-.095 1.966-.803 2.243-1.58.277-.777.277-1.443.194-1.58-.083-.14-.307-.223-.64-.39Z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const { play } = useSound()

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILL}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => play('hover')}
      onClick={() => play('click')}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-5 sm:left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: '#25D366', color: '#0B1020' }}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: '2px solid #25D366' }}
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    </motion.a>
  )
}
