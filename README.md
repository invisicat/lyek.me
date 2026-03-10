# lyek.me (Next.js + Bun + Convex)

This project is now a Next.js App Router app using Bun, with Convex as the data backend for projects and WIP entries.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Convex
- Bun package manager/runtime

## Quick Start

```bash
bun install
bun run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Convex Setup (What you need to do)

1. Create a Convex project (or use an existing one):
   ```bash
   bunx convex dev
   ```
2. Add the generated Convex env vars to `.env.local`:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `CONVEX_DEPLOYMENT`
3. Add admin CMS env vars to `.env.local`:
   - `ADMIN_PASSCODE`
   - `ADMIN_SESSION_SECRET`
4. Keep `bunx convex dev` running while developing.
5. Seed CMS defaults:
   ```bash
   bun run seed:cms
   ```

## Data Model

Convex schema is in:

- `convex/schema.ts`
- `convex/projects.ts`
- `convex/wip.ts`

Next server components fetch data via `lib/convex.ts`.

## Commands

- `bun run dev` - Start Next dev server
- `bun run build` - Production build
- `bun run start` - Start production server
- `bun run lint` - Run lint checks
- `bun run convex:dev` - Run Convex dev
- `bun run convex:codegen` - Generate Convex types (after Convex is configured)
- `bun run import:projects` - Import projects from `data.csv`
- `bun run seed:cms` - Seed categories, site content, and sort orders

## CMS Admin

- Visit `/admin/login` and sign in with `ADMIN_PASSCODE`.
- Manage CMS content at `/admin`:
  - projects (create, edit, delete, reorder using `sortOrder`)
  - categories (create, edit, delete, visibility, order)
  - WIP entries (create, edit, delete, order)
  - structured homepage/projects copy
