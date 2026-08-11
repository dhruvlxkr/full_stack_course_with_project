export default function Footer() {
  return (
    <footer
      className="relative py-8 px-5 sm:px-6 border-t"
      style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] text-center">
        <p>© {new Date().getFullYear()} Dharmendra Laxkar</p>
        <p>built with next.js + tailwind</p>
      </div>
    </footer>
  )
}
