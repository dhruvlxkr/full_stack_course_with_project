import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { Send, Mail, Github, Linkedin, Loader2 } from 'lucide-react'

// Sign up at https://formspree.io (free), create a form, and paste your
// form ID below. Until you do, the form will show a friendly setup notice
// instead of actually submitting anywhere.
const FORMSPREE_ID = 'YOUR_FORM_ID'
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      setStatus('error')
      return
    }

    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
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
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            // 05 connect.sh
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4">
            Let's build something
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[var(--muted)] mb-12">
            Have a project in mind? Send a signal.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="rounded-2xl border p-6 sm:p-8 text-left"
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
                      <Loader2 size={14} className="animate-spin" /> sending...
                    </>
                  ) : (
                    <>
                      Send transmission <Send size={14} />
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p className="font-mono text-xs text-center" style={{ color: '#FF6B6B' }}>
                    {FORMSPREE_ID === 'YOUR_FORM_ID'
                      ? 'Form not connected yet — add your Formspree ID in Contact.jsx.'
                      : 'Something went wrong. Please try again or email directly.'}
                  </p>
                )}
              </form>
            )}
            {status === 'sent' && (
              <div className="text-center py-8 font-mono text-sm text-[var(--accent)]">
                <p>&gt; transmission received.</p>
                <p className="text-[var(--muted)] mt-1">I'll respond within 24 hours.</p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex items-center justify-center gap-6 text-[var(--muted)]">
            <a href="mailto:hello@dharmendralaxkar.dev" className="hover:text-[var(--accent)] transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
