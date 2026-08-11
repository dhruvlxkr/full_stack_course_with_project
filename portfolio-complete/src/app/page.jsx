'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Projects from '../components/Projects.jsx'
import Timeline from '../components/Timeline.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import FloatingPortrait from '../components/FloatingPortrait.jsx'
import Preloader from '../components/Preloader.jsx'
import CustomCursor from '../components/CustomCursor.jsx'
import Analytics from '../components/Analytics.jsx'
import { SoundProvider } from '../components/SoundProvider.jsx'
import { VoiceProvider } from '../components/VoiceProvider.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import KonamiEasterEgg from '../components/KonamiEasterEgg.jsx'

const PROFILE_PHOTO = '/pic-white.jpg'

const THEMES = {
  night: {
    '--bg1': '#05070D',
    '--bg2': '#0B1020',
    '--accent': '#4CF3FF',
    '--accent2': '#8B7CFF',
    '--text': '#E7ECF7',
    '--muted': '#8891A8',
  },
  day: {
    '--bg1': '#EAF4FF',
    '--bg2': '#FDF3E4',
    '--accent': '#FF9F45',
    '--accent2': '#1B3A6B',
    '--text': '#0F1626',
    '--muted': '#5C6780',
  },
}

export default function Page() {
  const [theme, setTheme] = useState('night')
  const [, setLoaded] = useState(false)
  const vars = THEMES[theme]

  return (
    <SoundProvider>
      <VoiceProvider>
        <div
          className="min-h-screen transition-colors duration-700"
          style={{ ...vars, backgroundColor: 'var(--bg1)', color: 'var(--text)' }}
        >
          <Analytics />
          <Preloader onDone={() => setLoaded(true)} />
          <CustomCursor />
          <ScrollProgress />
          <Navbar theme={theme} setTheme={setTheme} />
          <main>
            <Hero theme={theme} />
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <Contact />
          </main>
          <Footer />
          <FloatingPortrait src={PROFILE_PHOTO} />
          <WhatsAppButton />
          <KonamiEasterEgg />
        </div>
      </VoiceProvider>
    </SoundProvider>
  )
}
