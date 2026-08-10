# Dharmendra Laxkar — Portfolio

Cinematic, scroll-animated portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

## Features
- **3D photo card in the hero**: tilts toward your cursor using real CSS 3D depth (glow ring, HUD corner brackets, and a status chip each sit on their own Z-layer), and rotates/lifts further as you scroll — the "movement on scroll" effect.
- **Floating avatar**: once you scroll past the hero, a small circular version of the same photo stays pinned in the corner for the rest of the page (click it to jump back to top), so the face stays present throughout scrolling.
- **Preloader**: a short boot-sequence screen plays once when the site first loads.
- **Custom robotic crosshair cursor** (desktop only — automatically disabled on touch devices).
- **Sound effects**: subtle synthesized beeps on hover/click, off by default, toggled from the navbar (speaker icon). No audio files used — sounds are generated live with the Web Audio API.
- **3D tilt cards** on both Projects and Skills — each card tilts toward the cursor.
- **Particle burst** on the day/night toggle when you click it.
- **Resume/CV download button** in the hero, linked to `public/resume.pdf`.
- **Working contact form** via Formspree (needs a one-line setup — see below).
- **SEO + Open Graph / Twitter card meta tags**, with a generated social-share image at `public/og-image.png`.
- **Optional analytics** (Google Analytics 4 or Plausible), off unless you set an env variable.
- Boot-sequence hero: terminal-style lines type out, then your name types letter-by-letter (robotic effect) with a glowing accent.
- Scroll-triggered reveals on every section (fade + rise, staggered).
- Animated "power bar" skill meters that fill when scrolled into view.
- Circuit/constellation canvas background — stars link like a circuit at night, drift apart as soft dust in day mode.
- Signature **day/night toggle**: sun/moon travels along a real arc, and the entire palette (background, accent, text) cross-fades smoothly between night and day.
- Project cards with hover glow, experience timeline styled as a "signal log", and a terminal-style contact form.
- Respects `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production files will be in `dist/` — upload that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## One-time setup for the new features

**Contact form (Formspree)**
1. Sign up free at [formspree.io](https://formspree.io) and create a form.
2. Copy your form ID and paste it into `FORMSPREE_ID` at the top of `src/components/Contact.jsx`.
3. Until you do this, the form shows a friendly "not connected yet" message instead of failing silently.

**Resume download**
- Replace `public/resume.pdf` with your real resume/CV — same filename, no code changes needed.

**SEO / Open Graph**
- In `index.html`, replace every `https://your-domain-here.com/` with your actual live domain once you deploy.
- `public/og-image.png` is a generated placeholder — swap it for your own 1200×630 image any time (keep the same filename).

**Analytics (optional)**
- Copy `.env.example` to `.env`.
- Fill in `VITE_GA_MEASUREMENT_ID` (Google Analytics 4) and/or `VITE_PLAUSIBLE_DOMAIN` (Plausible) — leave blank to skip either one.
- Restart `npm run dev` after editing `.env`.

**Sound effects**
- Off by default (autoplay-audio best practice). Visitors turn it on from the speaker icon in the navbar.

## Add your real photo

The site currently ships with a placeholder illustration at `src/assets/profile-placeholder.svg` (used both by the big 3D hero card and the small floating avatar). To use your actual photo:

1. Add your image file to `src/assets/` — e.g. `src/assets/profile.jpg` (a portrait/headshot, ideally at least 800px tall, works best).
2. In `src/components/Hero.jsx`, change:
   `import profilePhoto from '../assets/profile-placeholder.svg'` → `import profilePhoto from '../assets/profile.jpg'`
3. In `src/App.jsx`, change:
   `import profilePhoto from './assets/profile-placeholder.svg'` → `import profilePhoto from './assets/profile.jpg'`

That's it — both the 3D hero card and the floating avatar update automatically.

## Customize

- **Name / title**: edit `src/components/Hero.jsx` (the `TypingText` strings) and the subtitle text.
- **About text & stats**: `src/components/About.jsx`
- **Skills**: edit the `SKILLS` array in `src/components/Skills.jsx`
- **Projects**: edit the `PROJECTS` array in `src/components/Projects.jsx` — add real links via the `href`.
- **Experience**: edit the `LOG` array in `src/components/Timeline.jsx`
- **Contact links**: edit `src/components/Contact.jsx` (email, GitHub, LinkedIn URLs). The form currently just shows a "sent" confirmation locally — wire it to an email service (e.g. Formspree, EmailJS) or your own backend to actually receive messages.
- **Colors**: both palettes (night & day) live in `src/App.jsx` inside the `THEMES` object.
- **Fonts**: Orbitron (display), Space Grotesk (body), JetBrains Mono (terminal/robotic bits) — loaded via Google Fonts in `index.html`.
