# Tech Stack

Goals driving every choice below: fast load (good Lighthouse/Core Web Vitals),
smooth animation without jank, low maintenance, and no backend to babysit.

## Core

- **Next.js (App Router) + TypeScript** — static generation for every page,
  so first load is served pre-rendered HTML, not client-computed. TypeScript
  for correctness on the data-driven parts (experience list, project list,
  skill-match logic).
- **React 18** — comes with Next.js.

## Styling

- **Tailwind CSS** — utility classes, no runtime CSS-in-JS cost, tiny
  production bundle after purge.
- **CSS variables for theme tokens** (colors, spacing) so light/dark mode is
  a class toggle, not a JS re-render.

## Animation

- **Framer Motion** — section transitions, tab switching (Experience /
  Projects / Extracurricular), scroll-triggered reveals.
- **Lottie (lottie-react)** for the hero character (idea #3) and the
  train/plane + character-jump sequence (idea #2, Experience tab only).
  Vector-based, small file size, GPU-accelerated — avoid rigged 3D/WebGL
  characters, which would blow the load-time budget for a look we can get
  cheaper with Lottie.
- **`prefers-reduced-motion` media query respected everywhere** — animations
  degrade to instant/opacity-only for users who request it.

## Map (Experience tab)

- **Custom SVG map** (hand-drawn or simplified Toronto outline) with
  positioned `<button>` pins, not a mapping library (Mapbox/Google Maps JS
  are unnecessary weight for a handful of static pins and add network
  requests + API keys to manage).

## Icons / Fonts

- **lucide-react** — tree-shakeable icon set.
- **`next/font`** — self-hosted, subset, zero layout shift.

## Content / Data

- All content (experience entries, project entries, extracurricular
  entries) lives in typed local data files (`data/experience.ts`, etc.), not
  a CMS or database — keeps it static, fast, and free to host.
- **JD-match filter** (if we build it): pure client-side string/keyword
  matching against the local skills/project data — no backend, no API call.

## Hosting / Deployment

- **Vercel** — pairs natively with Next.js, free tier is enough for a
  portfolio, edge caching for static assets, automatic preview deployments
  per branch/PR.

## Performance strategy

- Static generation (`generateStaticParams` for project case-study pages)
  — no server round-trip on request.
- `next/image` for every illustration/photo — automatic resizing, lazy
  loading below the fold.
- Code-split by section: Experience tab's map/Lottie bundle only loads when
  that tab is opened, not on initial page load.
- Animation plays once per session (sessionStorage flag) — revisiting a tab
  doesn't replay the full sequence.
- Target: Lighthouse Performance ≥ 95, Largest Contentful Paint < 1.5s.

## Misc

- **Vercel Analytics** or **Plausible** — lightweight, privacy-respecting,
  no cookie banner needed.
- **Resend** (or EmailJS) for the contact form — no custom backend required.
- **ESLint + Prettier** — standard Next.js config.
- **Git + GitHub** — source control, connected to Vercel for CI/deploys.

## Open questions (not yet decided)

- Whether to include the Cmd+K command palette (`cmdk` library would be the
  pick if yes).
- Whether idea #1 (talking character) ships at all, and if so, as a muted
  opt-in easter egg only.
