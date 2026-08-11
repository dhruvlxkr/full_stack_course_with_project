'use client'

import { useEffect, useRef, useState } from 'react'

export default function TypingText({
  text,
  speed = 55,
  startDelay = 300,
  className = '',
  cursorClassName = '',
  onDone,
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    let timeoutId
    const startTimeout = setTimeout(function tick() {
      timeoutId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(timeoutId)
          onDone && onDone()
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(startTimeout)
      clearInterval(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span
        className={`inline-block w-[0.5ch] -mb-0.5 border-r-2 animate-blink ${cursorClassName}`}
        aria-hidden="true"
      />
      <span className="sr-only">{text}</span>
    </span>
  )
}
