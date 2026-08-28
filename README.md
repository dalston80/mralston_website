# MrAlston Website

Personal portfolio site for Dennis Alston ([mralston.me](https://mralston.me)), built with [Next.js](https://nextjs.org/) (App Router) and [Sanity](https://www.sanity.io/) as the headless CMS. The Sanity Studio is embedded at `/studio`.

## Requirements

- Node.js >= 20.9 (see `.nvmrc` — Node 22 recommended)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio.

Sanity credentials are read from `.env` / `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint (flat config)

## Stack

Next.js 16, React 19, Sanity 6 + next-sanity, Tailwind CSS 4, framer-motion, Headless UI 2, styled-components, @next/third-parties (Google Analytics).

## Known audit notes

`npm audit` reports vulnerabilities in build-time-only transitive deps of the Sanity CLI toolchain (`js-yaml`, `smol-toml` via `@vercel/frameworks`; `uuid` via `typeid-js`). These are not shipped to the browser; `npm audit fix --force` would downgrade `sanity` and is not recommended. Revisit when Sanity releases patched deps.

## Deploy on Vercel

The site is deployed on [Vercel](https://vercel.com/). See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for details.
