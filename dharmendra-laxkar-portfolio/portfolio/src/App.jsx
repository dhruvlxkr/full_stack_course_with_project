import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Timeline from './components/Timeline.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingPortrait from './components/FloatingPortrait.jsx'
import profilePhoto from './assets/profile-placeholder.svg'

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

export default function App() {
  const [theme, setTheme] = useState('night')

  const vars = THEMES[theme]

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{
        ...vars,
        backgroundColor: 'var(--bg1)',
        color: 'var(--text)',
      }}
    >
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
      <FloatingPortrait src={profilePhoto} />
    </div>
  )
}
