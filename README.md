# Mohammad Mashrur Mahtab Mahi — Portfolio

Personal portfolio site for Mohammad Mashrur Mahtab Mahi (Mashrur), Software Engineer.

**Live:** [mashrurmahtab.com](https://mashrurmahtab.com)

## Pages

- **Home** — hero introduction and social links
- **Experience** ([`/experience`](src/app/experience)) — work history on an interactive map (Canada / Bangladesh)
- **Projects** ([`/projects`](src/app/projects)) — selected projects and case studies
- **Awards** ([`/awards`](src/app/awards)) — scholarships, competitions, and recognitions in a radial layout
- **Leadership** ([`/leadership`](src/app/leadership)) — leadership roles and community involvement

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with TypeScript
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [react-leaflet](https://react-leaflet.js.org) for the Experience map

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run eslint
```

## Project structure

```
src/
  app/            # routes (App Router) — one folder per page
  components/     # UI components
  data/           # site content and per-page data (projects, awards, experience, leadership)
```

## Deployment

Deployed on [Vercel](https://vercel.com), connected to this repository. Pushes to `main` build and deploy automatically.
