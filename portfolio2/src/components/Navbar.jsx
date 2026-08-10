import { useEffect, useState } from 'react'
import DayNightToggle from './DayNightToggle.jsx'
import SoundToggle from './SoundToggle.jsx'
import { useSound } from './SoundProvider.jsx'

const LINKS = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'work' },
  { id: 'log', label: 'log' },
  { id: 'contact', label: 'contact' },
]

export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const { play } = useSound()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 backdrop-blur-md' : 'py-6'
      }`}
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg1) 78%, transparent)' : 'transparent',
        borderBottom: scrolled ? '1px solid color-mix(in srgb, var(--accent) 18%, transparent)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-sm tracking-[0.3em] text-[var(--text)]"
        >
          D<span className="text-[var(--accent)]">.</span>LAXKAR
        </button>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase text-[var(--muted)]">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => {
                  play('click')
                  scrollTo(link.id)
                }}
                onMouseEnter={() => play('hover')}
                className="hover:text-[var(--accent)] transition-colors duration-300"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <SoundToggle />
          <DayNightToggle theme={theme} setTheme={setTheme} />
        </div>
      </nav>
    </header>
  )
}
