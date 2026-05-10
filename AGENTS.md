# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vue 3 + Vite + TypeScript portfolio site. Application code lives in `src/`: route views in `src/views`, reusable UI in `src/components`, shared logic in `src/composables`, and static data/helpers in `src/utils`. Routing is defined in `src/router/index.ts`; localized copy lives in `src/locales/lang/{en,ar}.json`. Public assets such as images, icons, and `resume.pdf` live in `public/`. Build output goes to `dist/` and should not be edited manually.

## Build, Test, and Development Commands
Use the package scripts already defined in `package.json`:

- `npm run dev` starts the Vite dev server.
- `npm run type-check` runs `vue-tsc` for TypeScript validation.
- `npm run build` type-checks, builds, and copies `_dist_redirects` into `dist/` for Netlify routing.
- `npm run build-only` builds without the type-check step.
- `npm run preview` serves the production build locally.

Run `npm run type-check && npm run build` before opening a PR.

## Coding Style & Naming Conventions
Prefer Vue Composition API with `<script setup lang="ts">`. Use 2-space indentation, keep imports grouped, and favor single quotes in TypeScript files to match the cleaner existing entry-point code. Name views and components in PascalCase (`ResumeView.vue`, `NavBar.vue`); use camelCase for composables and utilities (`useTheme.ts`, `spotify.ts`). Keep route names lowercase. UnoCSS utilities are the primary styling approach; extend shared tokens in `uno.config.ts` instead of scattering one-off theme values.

## Testing Guidelines
There is no dedicated automated test suite yet. For now, treat `npm run type-check` and `npm run build` as the required validation baseline. Manually verify core routes (`/`, `/projects`, `/resume`) and any locale, theme, or SEO changes you touch.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commits, especially `feat:`. Continue using prefixes like `feat:`, `fix:`, and `docs:` with short imperative summaries. PRs should include a clear description, linked issue when relevant, and screenshots or short recordings for visible UI changes. Call out content updates to `src/utils/projects.ts`, translation changes, and any deployment-related config edits.

## Configuration Notes
`auto-imports.d.ts` and `components.d.ts` are generated support files; avoid hand-editing them unless the generator setup changes. Review `netlify.toml`, `_redirects`, `Dockerfile`, or `nginx.conf` carefully before changing deployment behavior.
