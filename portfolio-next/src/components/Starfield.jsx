'use client'

import { useEffect, useRef } from 'react'

export default function Starfield({ theme }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height, dpr
    let points = []
    let raf

    const NUM_POINTS = 90
    const LINK_DIST = 130

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      points = Array.from({ length: NUM_POINTS }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.6,
        twinkle: Math.random() * Math.PI * 2,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, width, height)
      const isNight = themeRef.current === 'night'
      const dotColor = isNight ? '76,243,255' : '27,58,107'
      const lineColor = isNight ? '139,124,255' : '255,159,69'
      const linkDist = isNight ? LINK_DIST : LINK_DIST * 0.55
      const lineAlphaBase = isNight ? 0.16 : 0.05

      for (let p of points) {
        p.x += p.vx
        p.y += p.vy
        p.twinkle += 0.02
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * lineAlphaBase
            ctx.strokeStyle = `rgba(${lineColor},${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (let p of points) {
        const twinkleAlpha = 0.5 + Math.sin(p.twinkle) * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor},${isNight ? twinkleAlpha : 0.35})`
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    init()
    step()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
