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
