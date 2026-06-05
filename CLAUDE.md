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

> **Windows note**: `npm run build` ends with `cp _dist_redirects dist/_redirects` (POSIX `cp`), which fails in native PowerShell/cmd. On Windows, validate with `npm run type-check && npm run build-only`, or run the full build under Git Bash / WSL.

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
- **`src/utils/spotify.ts`** — Static arrays of Spotify embed-iframe descriptors (`src`, dimensions, `allow`) rendered by `src/components/songs.vue`. Not an API integration — to change tracks/playlists, edit the embed URLs here.
- **`src/composables/useTheme.ts`** — Dark/light/auto theme toggle. Persists to the `theme-mode` localStorage key and toggles the `dark` class on `<html>`. **Caveat**: `src/main.ts` unconditionally force-enables dark mode on load (`classList.add('dark')` + writes a separate `theme-preference` key) before this composable mounts, so the site effectively boots dark regardless of stored preference.
- **`src/locales/lang/{en,ar}.json`** — i18n copy. The site supports English and Arabic; all user-visible text should go through vue-i18n rather than being hardcoded.
- **`uno.config.ts`** — UnoCSS config with icon presets (Iconify). Add new icon collections here.
- **`vite.config.ts`** — Vite config with unplugin-auto-import and unplugin-vue-components (components and Vue APIs are auto-imported; no explicit imports needed).

## Styling

UnoCSS is used with a Tailwind reset. Utility classes work exactly as in Tailwind. Icons are rendered via UnoCSS icon preset — use class names like `i-logos-vue` or `i-simple-icons-docker`. Installed icon collections come from the `@iconify-json/*` dev dependencies (carbon, logos, mdi, ri, skill-icons, solar, etc.).

**Custom theme** lives in `uno.config.ts`: shortcuts (`bg-base`, `border-base`, `social-link`, …), drift/`project-*` keyframe animations, and a `theme.colors` entry. Dark mode is class-based (`presetUno({ dark: 'class' })`), so always pair styles with `dark:` variants.

> **Safelist gotcha**: icon classes chosen at runtime (e.g. tech-tag icons resolved through `src/utils/icons.ts`) are not present in source as literal strings, so UnoCSS purges them. Any such icon must be added to the `safelist` array in `uno.config.ts` or it won't render. When adding a new project tech tag with a new icon, update both `icons.ts` and the `safelist`.

## Auto-imports

Both Vue Composition API helpers (`ref`, `computed`, `onMounted`, etc.) and components placed in `src/components/` are auto-imported by Vite plugins. You do not need to write import statements for these.

## Deployment

- **Netlify**: `npm run build` copies `_dist_redirects` → `dist/_redirects` for SPA routing.
- **Docker**: Multi-stage Dockerfile — builder stage runs `npm run build`, production stage serves `dist/` via Nginx. Dev stage runs Vite with `--host`.
