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

Every page, blog post, and case study gets its own branded 1200×630 blueprint PNG Open Graph card — no runtime image service. The renderer is **`build/og-image.ts`**: it builds an SVG (blueprint grid, corner marks, chip, wrapped title/subtitle) and rasterizes it with `@resvg/resvg-js`, using the Inter `.ttf` files in `build/fonts/` (resvg does not wrap text, so `wrapText` estimates Inter's advance width to break lines). Cards come from `staticCards` (home/projects/blogs/resume) plus one `blogCard` per post and one `projectCard` per case study; `allCards(blogs)` is the full set.

`ogImagePlugin` in `vite.config.ts` wires it in two modes: **dev** serves `/og/(page|blog|project)-<name>.png` on demand via middleware (so social debuggers + local preview work); **build** writes every card to `dist/og/*.png` in `closeBundle`. The URLs are referenced from the SEO modules in `src/utils/seo/` (`image:` fields point at `/og/page-*.png`; per-post `ogImage`). So: adding a blog post or case study auto-adds its OG card, but **changing OG copy/layout means editing `build/og-image.ts`, not a template**. New static page → add a card to `staticCards` and point its SEO module's `image` at the matching `/og/page-*.png`.

## Routes & data

Routes are in **`src/router/routes.ts`** (not `index.ts`); path strings are centralized in `src/utils/site.ts` (`sitePaths`). Current routes: `/` (Home), `/projects`, `/projects/:slug` (case studies), `/blogs`, `/blogs/:slug`, `/resume`, `/404`, catch-all. Home and NotFound are statically imported; **every other view is a lazy `() => import(...)`** so its content data stays out of the entry chunk.

Content is plain TypeScript data modules under `src/utils/` — no CMS:

- **`projects.ts`** — portfolio project data (title, description, tags, links, image).
- **`caseStudies.ts`** — long-form project deep dives rendered by `ProjectCaseView.vue`; `relatedBlogSlugs` powers the case→blog "Further Reading" links **and** the reverse blog→case links in `BlogPostView.vue`.
- **`blogs.ts`** — blog posts as structured content blocks (`paragraph`, `heading`, `list`, `code`); post metadata (`slug`, `title`, `excerpt`, `category`, `tags`, `readTime`, optional `ogImage`) feeds routing, the prerender set, SEO, and OG cards. `slug` drives routing. Paragraph/list text supports `` `inline code` `` and `[label](url)` links (rendered by `ContentBlocks.vue`). A `code` block with `language: 'mermaid'` is rendered as a live diagram by `MermaidDiagram.vue` in `BlogPostView.vue` (mermaid is lazy-`import()`ed on first use, theme-aware).
- **`site.ts`** — canonical `siteUrl` and `sitePaths` **only**. It is imported by every page, so it must stay dependency-free — never import content modules here.
- **`sitemap.ts`** — `sitemapEntries` (build-time only, consumed by `vite.config.ts`); imports the blog/case-study corpus, which is exactly why it lives apart from `site.ts`.
- **`seo/`** — per-route SEO `<head>` modules (OpenGraph, Twitter, JSON-LD schema), consumed via `useHead(...)`: `shared.ts` (createSeo factory, Person/WebSite schemas, notFoundSEO), `home.ts`, `projects.ts`, `case-study.ts`, `blog.ts`, `resume.ts`. **Split on purpose**: a view imports only its own module so e.g. the homepage chunk never pulls the blog corpus (`seo/blog.ts` is the only one allowed to import `blogs.ts`).
- **`icons.ts`** — maps tech-tag strings → Iconify icon ids for project cards.

## Sitemap

A custom Vite plugin in `vite.config.ts` generates `sitemap.xml` (dev: middleware at `/sitemap.xml`; build: `closeBundle` writes `dist/sitemap.xml`). `<lastmod>` per route is derived from **git commit dates** (`git log -1 --format=%cs`) of the source files mapped in `routeSources`/`globalSources`, falling back to the hand-set `lastmod` in `sitemapEntries` when git is unavailable. When adding a route: add it to `sitemapEntries` in `src/utils/sitemap.ts`, and optionally to `routeSources` in `vite.config.ts` for git-driven freshness.

A sibling `rssPlugin` generates **`/rss.xml`** (RSS 2.0, all blog posts, newest first) the same way — dev middleware + `closeBundle`. It reads only blog metadata, so new posts appear automatically; `index.html` carries the `<link rel="alternate" type="application/rss+xml">` for discovery.

> **Same-host only**: sitemap entries must be `elrefai.me` paths. Subdomain URLs (`srvj.elrefai.me`, `keepit.elrefai.me`) were once listed and had to be removed — the sitemap protocol forbids cross-host URLs and Google ignores them.

## Styling

UnoCSS with a Tailwind reset — utilities work as in Tailwind. Dark mode is class-based (`presetUno({ dark: 'class' })`), so pair styles with `dark:` variants. Two style layers coexist: the global Blueprint system in `src/assets/blueprint.css`, and UnoCSS shortcuts/animations/theme in **`uno.config.ts`** (`bg-base`, `border-base`, `social-link`, `project-*`/drift keyframes, `theme.colors`).

Icons render via the UnoCSS icon preset (`i-carbon-*`, `i-logos-*`, `i-simple-icons-*`, …) from the installed `@iconify-json/*` collections.

> **Safelist gotcha**: icon classes chosen at runtime (e.g. tech-tag icons resolved through `src/utils/icons.ts`) are not present as literal strings in source, so UnoCSS purges them. Such icons must be added to `safelist` in `uno.config.ts`. When adding a new tech tag with a new icon, update both `icons.ts` and the `safelist`.

## SEO & performance invariants

Established by a full SEO/CWV audit (2026-07); breaking any of these is a regression:

- **Canonicals are per-route only.** `createSeo` in `src/utils/seo/shared.ts` emits the canonical; `index.html` intentionally has **no** static `<link rel="canonical">` (a static one leaks onto the 404 page, which must not claim a canonical — `notFoundSEO` passes `canonical: false`). Don't re-add one to the template.
- **The entry chunk must not contain the blog corpus.** `site.ts` stays dependency-free, sitemap data lives in `sitemap.ts`, and only `seo/blog.ts` + the lazy blog views may import `blogs.ts`. (Before this split the homepage shipped every article as JS: 111KB → 67KB gzip.)
- **Hashed assets are cached immutable** via the `/assets/(.*)` header in `vercel.json` — safe only because Vite content-hashes filenames; never emit unhashed files into `dist/assets/`.
- **The homepage h1 (`aboutme.vue`) is the LCP element.** It must never animate `opacity` — it uses the transform-only `slide-down-lcp` keyframe, and its section wrapper has no fade-in. (A typing effect and an opacity fade have both been removed from it before; each cost ~1s of LCP.)
- **Image budgets**: `public/projects/*` logos render at ≤24px — keep sources ≤96px (a 944KB srvj.png once shipped for a 20px icon). `public/og-image.png` must stay **<300KB** or WhatsApp drops link previews. `favicon.ico` is a layered 16/32/48 ICO (~2KB) — regenerate from `icon-512.png`, don't drop in a raw export.
- **`public/llms.txt`** is a hand-maintained index for AI answer engines — update it when adding pages or blog posts.
- External `target="_blank"` links carry `rel="noopener noreferrer"`.
- `index.html` has two `theme-color` metas (light `#faf9f5` / dark `#141413` via `media`) — keep both.

## Theme

The navbar toggle (`src/components/darkmode.vue`) uses vueuse `useDark({ storageKey: 'theme-mode' })`, which toggles the `dark` class on `<html>` and persists to the `theme-mode` localStorage key. To avoid FOUC, an inline script in `index.html` reads the same `theme-mode` key synchronously before paint. **The `storageKey` option and the inline script must always agree** — the toggle once used vueuse's default key (`vueuse-color-scheme`) and every reload flashed the wrong theme.

## i18n / stores (current state)

There is no i18n and no store: vue-i18n and pinia were fully removed (packages, `src/locales/`, `src/stores/`) because nothing used them and they added ~50KB of dead JS to every page. If a task needs localized copy or a store, installing and registering the plugin in `main.ts` is part of the work.

## Auto-imports

Vue Composition API helpers (`ref`, `computed`, `onMounted`, …), `@vueuse/core`, composables in `src/composables/`, and components in `src/components/` are auto-imported (`unplugin-auto-import` + `unplugin-vue-components`). No explicit imports needed for these; `auto-imports.d.ts` and `components.d.ts` are generated — don't hand-edit.

## Deployment

- **Vercel** (primary): `vercel.json` — `cleanUrls`, `trailingSlash: false`, `/github` + `/gh` redirects, and security headers. `@vercel/analytics` mounts in `App.vue`.
- **Docker** (secondary): multi-stage `Dockerfile` builds and serves `dist/` via Nginx (`nginx.conf`); `docker-compose.yml` has dev/prod stages.
- `_dist_redirects` is legacy Netlify config and is **not** copied by the current build.
