'use client'

import { useEffect, useState } from 'react'

export default function RotatingTypingText({
  words = ['PHP Developer', 'Laravel Developer', 'Full Stack Developer'],
  typeSpeed = 70,
  deleteSpeed = 40,
  delayBetweenWords = 1800,
  className = '',
  cursorClassName = 'border-[var(--accent)]',
}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words || !words.length) return

    const currentWord = words[wordIndex]

    if (!isDeleting && subIndex === currentWord.length) {
      // Finished typing current word — pause before deleting
      const pauseTimer = setTimeout(() => setIsDeleting(true), delayBetweenWords)
      return () => clearTimeout(pauseTimer)
    }

    if (isDeleting && subIndex === 0) {
      // Finished deleting — move to next word
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timer)
  }, [subIndex, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delayBetweenWords])

  const currentWord = words[wordIndex] || ''
  const displayedText = currentWord.substring(0, subIndex)

  return (
    <span className={className}>
      <span>{displayedText}</span>
      <span
        className={`inline-block w-[0.45ch] h-[1.1em] ml-1 -mb-0.5 border-r-2 animate-blink ${cursorClassName}`}
        aria-hidden="true"
      />
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}
