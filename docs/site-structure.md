# Site Structure & Page Design

This is a **single-page app** (one URL, `/`) with distinct scroll sections,
plus **dynamic sub-pages** for individual project case studies. Recruiters
should be able to get your full profile from one scroll, and go deeper on a
specific project only if they choose to.

---

## `/` — Home (single page, sections in order)

### 1. Hero
- **Concept:** idea #3 — character illustration (Lottie loop) working at a
  PC, name + one-line tagline on screen.
- **Design:** static-feeling, low-motion loop (subtle typing/screen-glow
  animation only) so it reads as *alive* without demanding attention.
- **Loads:** instantly, above the fold, no blocking animation — user can
  start scrolling immediately.
- **Features:** name, role/title, one-line value prop, scroll-down
  indicator, links to resume/contact/socials (small, unobtrusive icons).

### 2. Section Switcher — Experience / Projects / Extracurricular
- **Design:** tab bar (sticky on scroll) with three options. Selecting one
  swaps the content panel below.
- **Transition rule:** Experience uses the signature animation (see below);
  Projects and Extracurricular use a fast fade/slide (<200ms) — no
  reanimating the map metaphor for content it doesn't fit.

#### 2a. Experience tab
- **Concept:** idea #2 — train/plane passes, character jumps onto a Toronto
  map, work-experience locations appear as clickable pins.
- **Design:** custom SVG map, Lottie/Framer Motion sequence for the
  jump-in, plays **once per session** (sessionStorage-gated) — instant on
  repeat visits/tab switches.
- **Features:** clicking a pin opens a small card (company, role, dates,
  1-2 line impact summary). No separate page — keeps recruiters in flow.

#### 2b. Projects tab
- **Design:** case-study cards, not just screenshots — each card shows
  project name, one-line problem statement, tech tags, and a "view case
  study" link.
- **Features:** card grid (2-3 per row desktop, 1 per row mobile). Clicking
  a card navigates to `/projects/[slug]` for the full write-up (problem →
  your role → key decision → outcome/metrics). Keeps the home page scannable
  while giving depth to anyone who clicks in.

#### 2c. Extracurricular tab
- **Design:** simple list/card layout, same visual language as Projects but
  lighter (no case-study depth needed) — org/activity name, role, dates,
  1-2 line description.
- **Features:** optional external links (org website, event page, etc.).

### 3. About / Skills *(added — flag if you don't want this)*
- **Why:** the "display full profile" requirement needs a skills summary
  and short bio somewhere; without it, a recruiter scanning quickly has no
  single place to see your stack/strengths at a glance.
- **Design:** short bio paragraph + grouped skill tags (languages,
  frameworks, tools). No animation — this section is for fast scanning.
- **Optional feature:** JD-match filter — paste a job description, matching
  skills/projects highlight. (See open question in tech.md.)

### 4. Contact / Footer *(added — flag if you don't want this)*
- **Why:** every portfolio needs a clear, low-friction way to reach you —
  this is often the highest-value real estate on the page.
- **Design:** minimal — email, LinkedIn, GitHub, resume download,
  optionally a short contact form (Resend-backed, no backend to maintain).

---

## `/projects/[slug]` — Project case study pages (dynamic, one per project)

- **Design:** long-form single column, generous whitespace, image/diagram
  support.
- **Structure:** Problem → Your role → Key decisions/trade-offs →
  Outcome/metrics → Links (repo/live demo).
- **Loads:** statically generated at build time — no runtime cost.
- **Nav:** back-to-home link + maybe prev/next project.

---

## Page count summary

| Page | Type | Notes |
|---|---|---|
| `/` | Single page, 4 sections + tab switcher | Hero, Experience/Projects/Extracurricular, About/Skills, Contact |
| `/projects/[slug]` | Dynamic, N pages (one per project) | Case study depth, statically generated |

**Total:** 1 main page + as many case-study pages as you have projects worth
deep-diving (recommend 2-4 — enough to show range without diluting focus).

## Open questions (not yet decided)

- Cmd+K command palette as a global nav shortcut — adds polish/dev-cred but
  not required for MVP.
- Whether idea #1 (talking character) appears anywhere, and where.
- Exact number and choice of projects to feature.
