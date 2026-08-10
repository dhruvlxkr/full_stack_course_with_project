# Dharmendra Laxkar — Portfolio

Cinematic, scroll-animated portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

## Features
- **3D photo card in the hero**: tilts toward your cursor using real CSS 3D depth (glow ring, HUD corner brackets, and a status chip each sit on their own Z-layer), and rotates/lifts further as you scroll — the "movement on scroll" effect.
- **Floating avatar**: once you scroll past the hero, a small circular version of the same photo stays pinned in the corner for the rest of the page (click it to jump back to top), so the face stays present throughout scrolling.
- **Scroll progress bar** at the very top of the page for a polished, professional touch.
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
