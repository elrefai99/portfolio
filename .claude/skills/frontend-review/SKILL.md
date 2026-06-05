---
name: frontend-review
description: Review frontend/UI changes in this Vue 3 + Vite + UnoCSS portfolio for accessibility, responsiveness, theme correctness, performance, and Vue/UnoCSS best practices. Use when reviewing .vue components, UnoCSS styling, routes, or any UI-facing change before commit or PR.
---

# Frontend Review

Review frontend changes in this repo (Vue 3 `<script setup>` + Vite + UnoCSS + Vue Router + Pinia + vue-i18n) for quality issues a generic code review would miss. Focus on what's actually changed — don't re-audit the whole app.

## Scope

Determine what to review:
- If the user named files or a PR, review those.
- Otherwise review the working-tree diff: `git diff` (unstaged) + `git diff --cached` (staged). If clean, review the last commit: `git show`.

Only flag issues in changed code or directly caused by it. Read enough surrounding context to avoid false positives (e.g. confirm a class isn't defined in `uno.config.ts` shortcuts before calling it invalid).

## Review checklist

Go through each area. Skip areas the diff doesn't touch.

### 1. Accessibility (a11y)
- Interactive elements are real `<button>`/`<a>`, not `<div @click>`. If a div must be clickable, it needs `role`, `tabindex`, and keyboard handlers.
- Images have meaningful `alt`; decorative images use `alt=""`.
- Links have discernible text (icon-only links need `aria-label`).
- Form inputs have associated `<label>` or `aria-label`.
- Color contrast is adequate in both light and dark themes.
- Focus states are visible (not removed via `outline-none` without a replacement).

### 2. Responsiveness
- Layouts use responsive UnoCSS breakpoints (`sm: md: lg:`) where width matters.
- No fixed pixel widths that overflow small screens; check horizontal scroll risk.
- Text and tap targets remain usable on mobile.
- Flex/grid wrap correctly; no clipped content.

### 3. Theme correctness (dark/light/auto)
- New colors respect the theme via `dark:` variants or theme tokens, not hardcoded single-mode colors.
- Verify against `src/composables/useTheme.ts` conventions.
- Backgrounds, borders, and text all switch — not just one of them.

### 4. Vue 3 / project conventions
- Uses Composition API with `<script setup>` (matches the codebase).
- No manual imports for auto-imported APIs (`ref`, `computed`, `onMounted`, …) or for components in `src/components/` — they're auto-imported via Vite plugins. Flag redundant imports.
- `v-for` has a stable `:key` (not array index when items reorder).
- Reactive state is `ref`/`reactive`/`computed` correctly; no mutating props.
- Event listeners / observers / intervals added in `onMounted` are cleaned up in `onUnmounted`.
- Props are typed; emits declared via `defineEmits`.
- User-facing strings go through vue-i18n (`$t(...)`) rather than being hardcoded, matching existing components.

### 5. UnoCSS / styling
- Icon classes use defined collections (check `uno.config.ts` presets — e.g. `i-logos-*`, `i-simple-icons-*`, `i-mdi-*`). Flag icon classes whose collection isn't installed in `package.json` (`@iconify-json/*`).
- Prefer utility classes over `<style>` blocks, consistent with the codebase.
- No duplicate/conflicting utilities; no leftover dead classes.

### 6. Performance
- Images are sized/lazy-loaded where appropriate (`loading="lazy"` for below-fold).
- No heavy work in render/computed that should be memoized or moved.
- Lists that can grow are not rendering unboundedly without need.
- Avoid unnecessary watchers/deep watches.

### 7. Data & SEO
- New routes have corresponding `<head>` metadata (see `src/utils/tags.ts`).
- New projects added to `src/utils/projects.ts` have all required fields and valid tag→icon mappings (`src/utils/icons.ts`).

## Output format

Report findings grouped by severity. For each: the file:line (as a clickable link), a one-line description of the problem, and a concrete fix. Be specific — quote the offending code. End with a short summary line. If a category is clean, don't pad the report with it. If everything is clean, say so plainly.

Do not modify files unless the user asks you to apply fixes.
