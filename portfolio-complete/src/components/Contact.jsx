'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { Send, Mail, Github, Linkedin, Instagram, Loader2, Phone, MapPin } from 'lucide-react'
import useSpeakOnView from './useSpeakOnView.js'
import { useVoice } from './VoiceProvider.jsx'

const FORMSPREE_ID = 'mjybwppg'
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`

const SOCIALS = [
  { icon: Github, href: 'https://github.com/dharmendralxkr', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dharmendralxkr/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/dharmendralxkr/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:dharmendralxkr@gmail.com', label: 'Email' },
]

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const { hasSpoken } = useVoice()

  const ref = useSpeakOnView(
    () =>
      hasSpoken('projects')
        ? "You've already checked out my work, so if something caught your eye, let's talk about it."
        : "If you have a project in mind, this is where our conversation can begin.",
    'contact',
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    setStatus('sending')

    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-28 px-5 sm:px-6 scroll-mt-20"
    >
      <div className="max-w-2xl mx-auto text-center">

        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] mb-4">
            Let's build something
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-[var(--muted)] mb-4 text-sm sm:text-base">
            Have a project in mind? Send a signal.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 font-mono text-xs text-[var(--muted)]">
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> 6378767914
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Jhamar Kotra, Udaipur
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="rounded-2xl border p-5 sm:p-8 text-left"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
              backgroundColor: 'color-mix(in srgb, var(--bg2) 70%, transparent)',
            }}
          >
            {status !== 'sent' && (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
                    name
                  </label>

                  <input
                    required
                    name="name"
                    type="text"
                    className="mt-1 w-full bg-transparent border-b border-[var(--muted)]/40 focus:border-[var(--accent)] outline-none py-2 text-[var(--text)] font-mono text-sm transition-colors"
                    placeholder="your name"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
                    email
                  </label>

                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-1 w-full bg-transparent border-b border-[var(--muted)]/40 focus:border-[var(--accent)] outline-none py-2 text-[var(--text)] font-mono text-sm transition-colors"
                    placeholder="you@domain.com"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
                    message
                  </label>

                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="mt-1 w-full bg-transparent border-b border-[var(--muted)]/40 focus:border-[var(--accent)] outline-none py-2 text-[var(--text)] font-mono text-sm resize-none transition-colors"
                    placeholder="tell me about the project..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 rounded-full py-3 font-mono text-xs uppercase tracking-widest bg-[var(--accent)] text-[var(--bg1)] disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      sending...
                    </>
                  ) : (
                    <>
                      Send transmission
                      <Send size={14} />
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p
                    className="font-mono text-xs text-center"
                    style={{ color: '#FF6B6B' }}
                  >
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

              </form>
            )}

            {status === 'sent' && (
              <div className="text-center py-8 font-mono text-sm text-[var(--accent)]">
                <p>&gt; transmission received.</p>
                <p className="text-[var(--muted)] mt-1">
                  I'll respond within 24 hours.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex items-center justify-center gap-6 text-[var(--muted)]">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}