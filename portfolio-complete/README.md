# Dharmendra Laxkar — Portfolio (Next.js)

Cinematic, scroll-animated portfolio rebuilt on **Next.js 14 (App Router) + Tailwind CSS + Framer Motion**, with real content pulled from your live site (dharmendralaxkar.vercel.app).

## What changed from the React/Vite version
- Rebuilt on Next.js (App Router, `src/app`), all interactive components marked `'use client'`.
- Content now reflects your real profile: PHP/Laravel/Full-stack developer, 2.5+ years experience, real projects, real contact details — no more placeholder robotics content.
- Education and "My Service" sections removed, per your request.
- Skills now include CakePHP, React.js, Next.js, and Node.js alongside PHP/Laravel/WordPress.
- Experience trimmed to two roles: **BeYoung Folk Private Limited** (Sep 2025 – Present, ERP/CRM modules) and **Dacnis Tech Solution** (May 2024 – Aug 2025).
- Hero photo pulls directly from your live site's image (`dharmendralaxkar.vercel.app/img/...`) — no download needed, it just loads from there.
- **AI voice narration**: uses the browser's built-in Speech Synthesis API (no API key, no cost) to read out a welcome line and a short line per section, only when turned on via the robot icon in the navbar.
- **Sound effects**: subtle synthesized beeps on hover/click, off by default, toggled from the speaker icon.
- The bottom-right floating avatar now **expands into round social icons** (LinkedIn, GitHub, Instagram, Email) when tapped, instead of just scrolling to top.
- Mobile name sizing fixed — the hero name now scales safely with `clamp()` so it never overflows small screens.
- Fully responsive pass across all sections (paddings, grids, font sizes tightened for small screens).

## What's new in this round
- **AI voice + sound are ON by default** now (browsers still require one click/tap before actual audio plays — that's a browser rule, not a bug; the site "unlocks" audio automatically on the very first interaction, whatever it is).
- **Waveform indicator + Replay button** next to the voice toggle in the navbar — animates while the AI is narrating, and lets you replay the last line.
- **Storytelling narration per section** — Hero, About, Skills, Projects, Timeline, and Contact each have their own casual, personality-driven line instead of robotic "Section: X" announcements.
- **Narration memory** — if you've already scrolled past Projects, the Contact section narration references that ("You've already checked out my work...").
- **Smart interruption** — clicking a nav link stops whatever's currently being narrated; fast scrolling never stacks up multiple lines queued on top of each other (latest visible section always wins).
- **Project filter + search** — filter by tag (PHP, React, WordPress, etc.) or search by name.
- **Per-project narration** — hover a project card for 2 seconds and the AI describes it, or click the 🔊 icon to hear it on demand any time.
- **Easter eggs** — hover/click the "∞ debug sessions" stat for a joke line; press ↑ ↑ ↓ ↓ ← → ← → anywhere on the page for a matrix-rain terminal mode.
- **WhatsApp floating button** (bottom-left) — opens a pre-filled chat to your number.
- **PWA support** — the site is installable ("Add to Home Screen" on mobile, install icon in desktop browsers) and works offline for the app shell via a small service worker.
- **Image optimization** — the hero and floating-avatar photos now load through `next/image` (automatic resizing, lazy loading, modern formats) instead of a plain `<img>` tag.
- **Accessibility/SEO pass** — the real heading/tagline text is present in the server-rendered HTML immediately (not just after the typing animation finishes), and every section has scroll-margin so the fixed navbar never covers it when you jump there.

### Known limitations / what I intentionally skipped
- **Word-by-word text highlighting synced to speech** — the `onboundary` timing event is unreliable across browsers/voices, so a synced highlight would flicker or drift. Skipped to avoid shipping something flaky; can revisit as a best-effort version if you still want it.
- **Full 3D face/avatar model with lip-sync** — this needs a completely different workflow (multiple reference photos, a 3D modeling/rigging pipeline). The photo + 3D-hologram-frame treatment already built is the practical version of that idea.
- **Real Lighthouse scores** — I can't run an actual Chrome/Lighthouse audit in this sandbox (no headless browser access), so I did a manual pass instead (semantic HTML, alt text, scroll-margin, image optimization, SSR'd headings). Once deployed, run `npx lighthouse <url>` or Chrome DevTools to get real numbers — happy to fix whatever it flags.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:3000`).

## Build for production

```bash
npm run build
npm run start
```

Deploys directly to Vercel with zero config (`vercel deploy`).

## One-time setup

**Contact form (Formspree)**
1. Sign up free at [formspree.io](https://formspree.io) and create a form.
2. Paste your form ID into `FORMSPREE_ID` at the top of `src/components/Contact.jsx`.
3. Until then, the form shows a "not connected yet" message instead of failing silently.

**Resume download**
- `public/resume.pdf` is currently a placeholder. Replace it with your real CV (same filename) — the download button in the hero picks it up automatically. I couldn't pull your real resume PDF automatically because this sandbox can't reach `vercel.app`; grab it from `https://dharmendralaxkar.vercel.app/resume/Dharmendra%20Laxkar.pdf` and drop it in.

**Photo**
- The hero and floating avatar currently load your photo directly from your live site's URL. If you'd rather host it locally, download it into `public/profile.jpg` and swap the `PROFILE_PHOTO` constant in `src/components/Hero.jsx` and `src/app/page.jsx` to `/profile.jpg`.

**SEO / Open Graph**
- In `src/app/layout.jsx`, the `metadataBase` URL is set to a placeholder — update it to your real deployed domain once you go live.
- `public/og-image.png` is a generated social-share image; swap it for your own any time (same filename, ideally 1200×630).

**WhatsApp button**
- Currently points to `916378767914` (your number with India's country code). Change it in the `WHATSAPP_NUMBER` constant in `src/components/WhatsAppButton.jsx` if needed.

**Analytics (optional)**
- Copy `.env.example` to `.env.local`.
- Fill in `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — leave blank to skip either.
- Restart `npm run dev` after editing.

## Customize further
- **Projects**: `src/components/Projects.jsx` — the `PROJECTS` array, each with a real link back to your live work.
- **Skills**: `src/components/Skills.jsx` — the `SKILLS` array.
- **Experience**: `src/components/Timeline.jsx` — the `LOG` array.
- **Contact links**: `src/components/Contact.jsx` and `src/components/FloatingPortrait.jsx` — the `SOCIALS` arrays (keep both in sync if you change a URL).
- **Colors**: both palettes live in `src/app/page.jsx` inside `THEMES`.
