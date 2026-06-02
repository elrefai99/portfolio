# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Type-check + build + copy Netlify redirects
npm run build-only   # Build without type-checking
npm run type-check   # Run vue-tsc only
npm run preview      # Preview production build locally
```

No test suite is configured. Run `npm run type-check && npm run build` as the validation baseline before opening a PR.

## Architecture

**Stack**: Vue 3 (Composition API, `<script setup>`) + Vite + UnoCSS + Vue Router + Pinia + vue-i18n + @vueuse/head

**Layout** (`App.vue`): `<NavBar>` → `<BackGround>` → `<RouterView>` → `<Footer>`

**Routes** (defined in `src/router/index.ts`, paths centralized in `src/utils/site.ts`):
- `/` → `HomeView` (AboutMe + Timeline)
- `/projects` → `projectsView` (filterable project gallery)
- `/blogs` → `BlogsView` (blog listing)
- `/blogs/:slug` → `BlogPostView` (individual blog post)
- `/resume` → `ResumeView`
- `/*` → `NotFound`

## Key Files

- **`src/utils/projects.ts`** — All portfolio project data (title, description, tags, links, image). Add new projects here.
- **`src/utils/blogs.ts`** — All blog post data as structured blocks (`paragraph`, `heading`, `list`, `code`). Add new posts here; slugs are used for routing.
- **`src/utils/site.ts`** — Canonical site URL, route path constants (`sitePaths`), and sitemap entries. Update sitemap here when adding routes.
- **`src/utils/icons.ts`** — Maps tech-stack tag strings to Iconify icon identifiers used on project cards.
- **`src/utils/tags.ts`** — SEO `<head>` metadata per route.
- **`src/utils/spotify.ts`** — Spotify API integration used by `Songs.vue`.
- **`src/composables/useTheme.ts`** — Dark/light/auto theme toggle persisted to localStorage.
- **`src/locales/lang/{en,ar}.json`** — i18n copy. The site supports English and Arabic; all user-visible text should go through vue-i18n rather than being hardcoded.
- **`uno.config.ts`** — UnoCSS config with icon presets (Iconify). Add new icon collections here.
- **`vite.config.ts`** — Vite config with unplugin-auto-import and unplugin-vue-components (components and Vue APIs are auto-imported; no explicit imports needed).

## Styling

UnoCSS is used with a Tailwind reset. Utility classes work exactly as in Tailwind. Icons are rendered via UnoCSS icon preset — use class names like `i-logos-vue` or `i-simple-icons-docker`. Available icon collections are defined in `uno.config.ts` under `presets`.

## Auto-imports

Both Vue Composition API helpers (`ref`, `computed`, `onMounted`, etc.) and components placed in `src/components/` are auto-imported by Vite plugins. You do not need to write import statements for these.

## Deployment

- **Netlify**: `npm run build` copies `_dist_redirects` → `dist/_redirects` for SPA routing.
- **Docker**: Multi-stage Dockerfile — builder stage runs `npm run build`, production stage serves `dist/` via Nginx. Dev stage runs Vite with `--host`.
