# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start dev server (Turbopack, http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run db:migrate   # Run Prisma migrations (prompts for migration name)
npm run db:seed      # Seed database (tsx prisma/seed.ts)
npm run db:studio    # Open Prisma Studio
```

To create a named migration: `npm run db:migrate -- --name <migration_name>`

## Architecture

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Prisma 5 (SQLite) · NextAuth v5 (JWT) · Tailwind CSS v4 · Zod · Framer Motion · @ark-ui/react

**Route groups:**
- `src/app/(app)/` — authenticated app pages, wrapped by `src/app/(app)/layout.tsx` which enforces auth via `auth()` and renders `<AppShell>`
- `src/app/(auth)/` — login + register pages (unauthenticated)
- `src/app/landing/` — public landing page
- `src/app/api/` — API routes; all protected routes call `const session = await auth()` then check `session?.user?.id`

**Layout chain:** `RootLayout` → `Providers` (SessionProvider + NotepadProvider) → `(app)/layout` (server, auth check) → `AppShell` (client, Sidebar + Header + Notepad floating panel)

**Auth:** NextAuth v5 with JWT strategy. Import `auth` from `@/lib/auth` — usable in both server components and API routes. Session exposes `user.id`, `user.role`, `user.currentLevel`, `user.streak`, `user.totalXP`.

**Standard API route pattern:**
```ts
const session = await auth();
if (!session?.user?.id) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
const userId = session.user.id;
// Zod validation, then prisma.*
```

**DB pattern for user-specific data:** Model with `userId String @unique` + a JSON `String` field (see `UserWochenplan`, `UserNotepad`), API route with GET + PUT using `prisma.[model].upsert()`.

**Tailwind v4 custom colors** are defined in `src/app/globals.css` under `@theme inline` and map directly to utility classes: `bg-navy`, `bg-navy-light`, `bg-navy-card`, `border-navy-border`, `text-gold`, `text-text-primary`, `text-text-secondary`, `text-text-muted`.

**Key utilities:**
- `src/lib/auth.ts` — NextAuth config + `auth()` export
- `src/lib/prisma.ts` — singleton PrismaClient
- `src/lib/srs.ts` — spaced repetition algorithm (SM-2) used for vocabulary review scheduling
- `src/lib/saveProgress.ts` — client-side helper to POST XP/skill progress to the API
- `src/lib/curriculum.ts` — static curriculum tree (levels → units → lessons)
