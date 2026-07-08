# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server (http://localhost:5173)
npm run build        # run-p: type-check AND vite-ssg build, in parallel
npm run build-only   # vite-ssg build, no type-check
npm run type-check   # vue-tsc --build --force
npm run preview      # Serve the production build locally
```

No test suite exists. `npm run type-check && npm run build` is the validation baseline before a PR.

`npm run build` uses `run-p` (npm-run-all2), so `type-check` and the SSG build run **concurrently** — the command fails if either fails, but a type error does not stop the build from also running. The lockfile is `pnpm-lock.yaml`; prefer `pnpm` to keep it in sync (the scripts are standard and work with either).

## Big picture

This is a static-site-generated (SSG) Vue 3 portfolio, prerendered to HTML at build time and deployed on **Vercel**. Three ideas drive most of the code and are not obvious from any single file:

### 1. vite-ssg prerendering

The entry point is `ViteSSG`, not `createApp` (`src/main.ts`). Every route is prerendered to static HTML at build time. `ssgOptions.includedRoutes` in `vite.config.ts` drops `:param` routes and explicitly enumerates blog routes, so **each blog slug gets its own prerendered HTML file** — adding a blog to `src/utils/blogs.ts` automatically extends the prerender set. The `/404` route is a literal (non-`:param`) path so it prerenders to `dist/404.html`, which Vercel auto-serves with a real 404 status.

### 2. The "Blueprint" architectural design system

The whole site is themed as an architectural blueprint / building elevation. This is the dominant visual language and lives in **`src/assets/blueprint.css`** (imported globally in `main.ts`): `--bp-*` CSS custom properties and `bp-*` component classes (`bp-nav`, `bp-floor`, `bp-card`, `bp-slab`, `bp-chip`, `bp-tab`, `bp-mono`, `bp-roof`, `bp-footer`, …). Dark mode is "blueprint" (near-black), light mode is "paper blueprint" — both defined via `--bp-*` vars on `:root` / `:root:not(.dark)`.

`App.vue` frames the page as a building: roof datum (top) → floors → foundation (footer). Each page section is a **`<FloorSection>`** (`src/components/FloorSection.vue`) with a level code (`L-04`), name, elevation annotation, concrete-slab separators, corner registration marks, and IntersectionObserver scroll-reveal (`eager` disables the reveal for the above-the-fold LCP floor). Build new pages as floors to stay consistent — `BlogsView.vue` is a clean reference.

### 3. Build-time OG image generation

Every page and blog post gets its own branded 1200×630 blueprint PNG Open Graph card — no runtime image service. The renderer is **`build/og-image.ts`**: it builds an SVG (blueprint grid, corner marks, chip, wrapped title/subtitle) and rasterizes it with `@resvg/resvg-js`, using the Inter `.ttf` files in `build/fonts/` (resvg does not wrap text, so `wrapText` estimates Inter's advance width to break lines). Cards come from `staticCards` (home/projects/blogs/resume) plus one `blogCard` per post; `allCards(blogs)` is the full set.

`ogImagePlugin` in `vite.config.ts` wires it in two modes: **dev** serves `/og/(page|blog)-<name>.png` on demand via middleware (so social debuggers + local preview work); **build** writes every card to `dist/og/*.png` in `closeBundle`. The URLs are referenced from the `*SEO` exports in `src/utils/tags.ts` (`image:` fields point at `/og/page-*.png`; per-post `ogImage`). So: adding a blog post auto-adds its OG card, but **changing OG copy/layout means editing `build/og-image.ts`, not a template**. New static page → add a card to `staticCards` and point its `tags.ts` `image` at the matching `/og/page-*.png`.

## Routes & data

Routes are in **`src/router/routes.ts`** (not `index.ts`); path strings are centralized in `src/utils/site.ts` (`sitePaths`). Current routes: `/` (Home), `/projects`, `/blogs`, `/blogs/:slug`, `/resume`, `/404`, catch-all.

Content is plain TypeScript data modules under `src/utils/` — no CMS:

- **`projects.ts`** — portfolio project data (title, description, tags, links, image).
- **`blogs.ts`** — blog posts as structured content blocks (`paragraph`, `heading`, `list`, `code`); post metadata (`slug`, `title`, `excerpt`, `category`, `tags`, `readTime`, optional `ogImage`) feeds routing, the prerender set, SEO, and OG cards. `slug` drives routing. A `code` block with `language: 'mermaid'` is rendered as a live diagram by `MermaidDiagram.vue` in `BlogPostView.vue` (mermaid is lazy-`import()`ed on first use, theme-aware).
- **`site.ts`** — canonical `siteUrl`, `sitePaths`, and `sitemapEntries`.
- **`tags.ts`** — per-route SEO `<head>` (OpenGraph, Twitter, JSON-LD schema); consumed via `useHead(...)` in each view.
- **`icons.ts`** — maps tech-tag strings → Iconify icon ids for project cards.
- **`spotify.ts`** — static Spotify embed-iframe descriptors (not an API); edit the embed URLs to change tracks.

## Sitemap

A custom Vite plugin in `vite.config.ts` generates `sitemap.xml` (dev: middleware at `/sitemap.xml`; build: `closeBundle` writes `dist/sitemap.xml`). `<lastmod>` per route is derived from **git commit dates** (`git log -1 --format=%cs`) of the source files mapped in `routeSources`/`globalSources`, falling back to the hand-set `lastmod` in `sitemapEntries` when git is unavailable. When adding a route: add it to `sitemapEntries` in `site.ts`, and optionally to `routeSources` in `vite.config.ts` for git-driven freshness.

## Styling

UnoCSS with a Tailwind reset — utilities work as in Tailwind. Dark mode is class-based (`presetUno({ dark: 'class' })`), so pair styles with `dark:` variants. Two style layers coexist: the global Blueprint system in `src/assets/blueprint.css`, and UnoCSS shortcuts/animations/theme in **`uno.config.ts`** (`bg-base`, `border-base`, `social-link`, `project-*`/drift keyframes, `theme.colors`).

Icons render via the UnoCSS icon preset (`i-carbon-*`, `i-logos-*`, `i-simple-icons-*`, …) from the installed `@iconify-json/*` collections.

> **Safelist gotcha**: icon classes chosen at runtime (e.g. tech-tag icons resolved through `src/utils/icons.ts`) are not present as literal strings in source, so UnoCSS purges them. Such icons must be added to `safelist` in `uno.config.ts`. When adding a new tech tag with a new icon, update both `icons.ts` and the `safelist`.

## Theme

`src/composables/useTheme.ts` handles dark/light/auto, persists to the `theme-mode` localStorage key, and toggles the `dark` class on `<html>`. To avoid FOUC, an inline script in `index.html` reads `theme-mode` synchronously before paint and applies `dark` (mirroring the composable's logic). `theme-mode` is the single source of truth.

## i18n (current state)

vue-i18n and pinia are **not registered** — both were removed from `src/main.ts` because nothing used them (no `$t`/`useI18n`, no store imports) and they added ~50KB of dead JS to every page. The packages remain in `package.json`, and `src/locales/` (`lang/{en,ar}.json`) plus `src/stores/counter.ts` still exist as dormant scaffolding. If a task needs localized copy or a store, re-registering the plugin in `main.ts` is part of the work.

## Auto-imports

Vue Composition API helpers (`ref`, `computed`, `onMounted`, …), `@vueuse/core`, composables in `src/composables/`, and components in `src/components/` are auto-imported (`unplugin-auto-import` + `unplugin-vue-components`). No explicit imports needed for these; `auto-imports.d.ts` and `components.d.ts` are generated — don't hand-edit.

## Deployment

- **Vercel** (primary): `vercel.json` — `cleanUrls`, `trailingSlash: false`, `/github` + `/gh` redirects, and security headers. `@vercel/analytics` mounts in `App.vue`.
- **Docker** (secondary): multi-stage `Dockerfile` builds and serves `dist/` via Nginx (`nginx.conf`); `docker-compose.yml` has dev/prod stages.
- `_dist_redirects` is legacy Netlify config and is **not** copied by the current build.
