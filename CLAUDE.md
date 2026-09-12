# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Nuxt dev server (http://localhost:3000)
pnpm build        # nuxt build (server build; not used for deploy)
pnpm generate     # nuxt generate → fully static output in .output/public
pnpm preview      # serve the generated build locally
pnpm type-check   # nuxt typecheck (vue-tsc)
```

No test suite exists. `pnpm type-check && pnpm generate` is the validation baseline before a PR. The lockfile is `pnpm-lock.yaml`; use `pnpm`. `pnpm install` runs `nuxt prepare` (postinstall) to regenerate `.nuxt/` types.

> **Build-scripts gate**: `pnpm-workspace.yaml` lists `esbuild`, `vue-demi`, `@parcel/watcher` under `onlyBuiltDependencies`/`allowBuilds`. If pnpm reports `ERR_PNPM_IGNORED_BUILDS`, add the flagged package there — otherwise `nuxt typecheck`'s dependency check aborts.

## Big picture

This is a **Nuxt 4** portfolio, statically generated (`nuxt generate`, Nitro `preset: 'static'`) to `.output/public` and deployed on **Vercel** (secondary: Docker/Nginx). Three ideas drive most of the code:

### 1. Nitro static prerendering

`ssr: true` + `nitro.preset: 'static'` in `nuxt.config.ts`. Every route is prerendered to static HTML at build time. `nitro.prerender.routes` **explicitly enumerates** all pages plus every blog/case-study slug and every OG image URL, computed from the TS content modules — so adding a blog to `shared/utils/blogs.ts` (or a case study to `caseStudies.ts`) automatically extends the prerender set. `crawlLinks: true` is a safety net; `failOnError: true` fails the build on any prerender error (bad OG render, broken link).

Unknown routes get a **genuine HTTP 404**: unlisted slugs are never prerendered, so the host serves `404.html` with a 404 status (no SPA 200 fallback). `app/pages/blogs/[slug].vue` and `projects/[slug].vue` `throw createError({ statusCode: 404, fatal: true })` for unknown slugs, which renders `app/error.vue` (the branded NotFound page, `notFoundSEO` → `noindex`, no canonical). Nginx uses `error_page 404 /404.html`; Vercel auto-serves `404.html`.

> Nitro emits `404.html`/`200.html` as hydrating shells (not fully baked HTML). The 404 **HTTP status** is authoritative for crawlers; `error.vue` injects `noindex` on hydration. Don't add `robots: noindex` to the global `app.head` — it would leak onto every page.

### 2. The "Blueprint" architectural design system

Unchanged from before the Nuxt migration. The whole site is themed as an architectural blueprint / building elevation, living in **`app/assets/blueprint.css`** (loaded via `nuxt.config.ts` `css`): `--bp-*` CSS custom properties and `bp-*` component classes (`bp-nav`, `bp-floor`, `bp-card`, `bp-slab`, `bp-chip`, `bp-tab`, `bp-mono`, `bp-roof`, `bp-footer`, …). Dark mode is "blueprint" (near-black), light mode is "paper blueprint".

`app/app.vue` frames the page as a building: roof datum (top) → `<NuxtPage />` (floors) → foundation (footer). Each page section is a **`<FloorSection>`** (`app/components/FloorSection.vue`) with a level code (`L-04`), name, elevation annotation, slab separators, corner marks, and IntersectionObserver scroll-reveal (`eager` disables the reveal for the above-the-fold LCP floor). Build new pages as floors — `app/pages/blogs/index.vue` is a clean reference.

### 3. Build-time OG image generation (server route)

Every page, blog post, and case study gets its own branded 1200×630 blueprint PNG Open Graph card. The renderer is **`server/utils/og-image.ts`** (SVG → `@resvg/resvg-js`, using the Inter `.ttf` files in `build/fonts/`). It is exposed by the Nitro server route **`server/routes/og/[name].ts`** (`/og/<card>.png`): served on demand in `nuxt dev` (social debuggers + local preview) and **prerendered to `.output/public/og/*.png`** because every card URL is in `nitro.prerender.routes`. `@resvg/resvg-js` is `nitro.externals.external` — server-only, never in the browser bundle. Changing OG copy/layout means editing `server/utils/og-image.ts` (`staticCards` / `blogCard` / `projectCard`), not a template.

## Routes & data

Routing is Nuxt file-based under **`app/pages/`**: `index.vue` (`/`), `projects/index.vue`, `projects/[slug].vue` (case studies), `blogs/index.vue`, `blogs/[slug].vue`, `resume.vue`. `app/error.vue` handles 404s. Path strings are centralized in `shared/utils/site.ts` (`sitePaths`). Home is the landing chunk; Nuxt code-splits every page automatically.

Content is plain TypeScript data modules under **`shared/utils/`** (importable from app, server, and `nuxt.config.ts` via the `~~/shared/...` alias) — no CMS:

- **`projects.ts`** — portfolio project data (title, description, tags, links, image, `altNames`, `caseStudy` flag).
- **`caseStudies.ts`** — long-form deep dives rendered by `projects/[slug].vue`; `relatedBlogSlugs` powers case→blog "Further Reading" **and** the reverse blog→case links in `blogs/[slug].vue`.
- **`blogs.ts`** — blog posts as structured content blocks (`paragraph`, `heading`, `list`, `code`); metadata feeds routing, the prerender set, SEO, and OG cards. Paragraph/list text supports `` `inline code` `` and `[label](url)` links (rendered by `ContentBlocks.vue`). A `code` block with `language: 'mermaid'` is rendered live by `MermaidDiagram.vue` (mermaid lazy-`import()`ed, theme-aware).
- **`site.ts`** — canonical `siteUrl` and `sitePaths` **only**. Imported everywhere, so it must stay dependency-free — never import content modules here.
- **`sitemap.ts`** — `sitemapEntries`, consumed only by the sitemap server route; imports the corpus, which is why it lives apart from `site.ts`.
- **`seo/`** — per-route SEO `<head>` modules consumed via Nuxt's auto-imported `useHead(...)`: `shared.ts` (createSeo factory, Person/WebSite/Organization schemas, notFoundSEO), `home.ts`, `projects.ts`, `case-study.ts`, `blog.ts`, `resume.ts`, `contact.ts`. **Split on purpose**: a page imports only its own module so e.g. the homepage never pulls the blog corpus (`seo/blog.ts` is the only SEO module allowed to import `blogs.ts`).
- **`icons.ts`** — maps tech-tag strings → bare Iconify icon ids (`logos:redis`), consumed by `TagIcon.vue`. **Not** UnoCSS utility classes — see the tech-tag icon note under Styling.
- **`tagIconId.ts`** — tag icon id → `<symbol>` DOM id. Shared by the sprite generator and `TagIcon.vue`; they must agree.
- **`featuredPosts.ts`** — the three posts `SelectedWriting.vue` links from the homepage, as slug/title/category literals so the home chunk never imports `blogs.ts`. `nuxt.config.ts` asserts at build time that the titles and categories still match the corpus, so the anchor text can't silently drift from the target page's h1.

## Sitemap / RSS (server routes)

**`server/routes/sitemap.xml.ts`** generates `sitemap.xml` and **`server/routes/rss.xml.ts`** generates `rss.xml` (RSS 2.0, full `content:encoded`, newest first). Both are prerendered into `.output/public` (and served live in `nuxt dev`). `<lastmod>` per route is derived from **git commit dates** (`git log -1 --format=%cs`) of the source files mapped in `routeSources`/`globalSources` in the sitemap route, falling back to the hand-set `lastmod` in `sitemapEntries` when git is unavailable (uncommitted files, Docker builds that exclude `.git`). When adding a route: add it to `sitemapEntries`, and optionally to `routeSources`. The RSS discovery `<link>` lives in `nuxt.config.ts` `app.head`.

> **Same-host only**: sitemap entries must be `elrefai.me` paths. Subdomain URLs (`srvj.elrefai.me`, `Qar.elrefai.me`) are forbidden — the sitemap protocol bans cross-host URLs and Google ignores them.

## Styling

UnoCSS via **`@unocss/nuxt`**, reading the unchanged **`uno.config.ts`** (`presetUno({ dark: 'class' })`, `presetAttributify`, `presetIcons`; shortcuts, theme colors, animations, safelist). `@unocss/reset/tailwind.css` is in the `nuxt.config.ts` `css` array. Utilities and attributify syntax work as before. Icons render via the UnoCSS icon preset from the installed `@iconify-json/*` collections.

> **Tech-tag icons are NOT UnoCSS icons.** They used to be safelisted `i-logos:*` utilities, which forced all ~24 multicolour logos into the single global stylesheet — 75KB raw / 27KB gz of render-blocking CSS on every page, including `/blogs`, `/resume` and `/contact`, which draw no chips at all. They now live in **one external sprite, `public/icons/tags.svg`** (54KB raw / 22KB gz, generated): `shared/utils/icons.ts` maps a tag → a bare Iconify id (`logos:redis`) and **`app/components/TagIcon.vue`** emits `<use href="/icons/tags.svg#ti-…">`. Only the tag→id map travels in JS; the artwork is one cached, off-critical-path request that the 8 chip-free pages never make.
>
> Inlining the SVG bodies per chip is the other wrong answer — it moves the same bytes into the HTML (it took `/projects` to 205KB) *and* ships them again as hydration data.
>
> Adding a tech-tag icon → add the mapping to `icons.ts`, add the id to the list in `scripts/gen-tag-icons.mjs`, then run `node scripts/gen-tag-icons.mjs`. There is deliberately **no `safelist`** in `uno.config.ts`; don't reintroduce one for tag logos.

## SEO & performance invariants

Breaking any of these is a regression:

- **Canonicals are per-route only.** `createSeo` in `shared/utils/seo/shared.ts` emits the canonical; the global `app.head` in `nuxt.config.ts` has **no** static canonical (a static one would leak onto the 404 page — `notFoundSEO` passes `canonical: false`).
- **The entry chunk must not contain the blog corpus.** `site.ts` stays dependency-free; only `seo/blog.ts` + the blog pages import `blogs.ts`. Verify after a build: none of the JS chunks referenced by `.output/public/index.html` should contain blog/case-study body strings.
- **Hashed assets are cached immutable** via the `/_nuxt/(.*)` header in `vercel.json` — safe because Nuxt content-hashes those filenames.
- **The homepage h1 (`app/components/aboutme.vue`) is the LCP element.** It must never animate `opacity` — it uses the transform-only `slide-down-lcp` keyframe, and its floor is `eager` (no fade-in). No page transition is configured; don't add one that fades the homepage.
- **Image budgets**: `public/projects/*` logos render at ≤24px — keep sources ≤96px. `public/og-image.png` must stay **<300KB** or WhatsApp drops previews. Generated `/og/*.png` cards are ~60–80KB. `favicon.ico` is a layered 16/32/48 ICO (~2KB).
- **`public/llms.txt`** is a hand-maintained index for AI answer engines — update it when adding pages or blog posts.
- External `target="_blank"` links carry `rel="noopener noreferrer"`.
- `nuxt.config.ts` `app.head` has two `theme-color` metas (light `#faf9f5` / dark `#141413` via `media`) — keep both.

## Theme

The navbar toggle (`app/components/darkmode.vue`) uses `useDark({ storageKey: 'theme-mode' })` (from `@vueuse/core`, auto-imported via `@vueuse/nuxt`), which toggles the `dark` class on `<html>` and persists to `theme-mode`. To avoid FOUC, an inline script in `nuxt.config.ts` `app.head` (`tagPriority: 'critical'`) reads the same `theme-mode` key synchronously before paint. **The `storageKey` and the inline script must always agree.** The `dark` class lives on `<html>` (outside the Vue app root), so there's no hydration mismatch and Unhead doesn't manage it.

## Mermaid

`app/components/MermaidDiagram.vue` dynamically `import()`s mermaid only when a diagram nears the viewport (IntersectionObserver, `400px` rootMargin), keeping the ~600KB bundle off the critical path. It is **not** `ClientOnly`: the `<pre><code>` source fallback renders during prerender (the component only upgrades to SVG after mount + intersection), so crawlers and no-JS clients get the code. A MutationObserver re-renders on theme toggle.

Nuxt's client manifest works against this: it emits `<link rel="prefetch">` for the whole mermaid + katex graph on every article page, so the browser pulled ~140KB gz at idle even on posts with no diagram. The `build:manifest` hook in `nuxt.config.ts` walks the import graph out from the named mermaid/katex modules and clears `prefetch` on everything reachable — name-matching alone misses it, because mermaid's ~600KB core lands in an anonymous shared chunk. **Verify after a build: `grep -c 'rel="prefetch"' .output/public/blogs/*/index.html` must be 0.**

## Auto-imports

Nuxt auto-imports: Vue Composition API (`ref`, `computed`, `onMounted`, …), Nuxt composables (`useHead`, `useRoute`, `createError`, `navigateTo`, `useRequestURL`, …), `@vueuse/core` (via `@vueuse/nuxt`), components in `app/components/`, and `shared/utils/**`. Components keep their file-based names — lowercase filenames resolve PascalCase (`footer.vue` → `<Footer>`, `darkmode.vue` → `<Darkmode>`, `aboutme.vue` → `<Aboutme>`, `timeline.vue` → `<Timeline>`). Content/SEO modules are imported **explicitly** (`~~/shared/utils/...`) to keep the chunk-split invariant obvious, even though they're auto-importable. `.nuxt/` type decls are generated — don't hand-edit.

## Deployment

- **Vercel** (primary): `vercel.json` — `buildCommand: pnpm run generate`, `outputDirectory: .output/public`, `framework: null` (forces the static output; no SPA catch-all rewrite), `cleanUrls`, `trailingSlash: false`, `/github` + `/gh` redirects, security headers, `/_nuxt/(.*)` immutable cache. `@vercel/analytics` + `@vercel/speed-insights` mount in `app.vue` (inside `<ClientOnly>`).
- **Docker** (secondary): multi-stage `Dockerfile` (Node 22 + pnpm) runs `pnpm run generate` and serves `.output/public` via Nginx (`nginx.conf`: `try_files $uri $uri.html $uri/ =404` + `error_page 404 /404.html`). `docker-compose.yml` dev stage runs `nuxt dev` on port 3000.

## Nuxt structure

```
nuxt.config.ts        modules, css, app.head, nitro prerender, caseStudy-flag +
                      featuredPosts assertions, mermaid-prefetch build:manifest hook
app/
  app.vue             building frame (NavBar, roof, <NuxtPage>, Footer, analytics)
  error.vue           branded 404 (notFoundSEO)
  router.options.ts   scrollBehavior (saved position / smooth hash / instant top)
  assets/             blueprint.css, main.css (+ Alexandria @font-face)
  components/          all UI components (auto-imported)
  pages/               file-based routes
shared/utils/          site, projects, caseStudies, blogs, sitemap, icons,
                      tagIconId, featuredPosts, seo/
scripts/               gen-tag-icons.mjs (regenerates public/icons/tags.svg)
server/
  utils/og-image.ts    OG renderer (@resvg, build/fonts/*.ttf)
  routes/              sitemap.xml.ts, rss.xml.ts, og/[name].ts (all prerendered)
public/                static assets (favicons, fonts, projects logos, llms.txt,
                      robots.txt, icons/tags.svg [generated])
build/fonts/           Inter *.ttf for OG rendering (read at prerender via process.cwd())
```

There is no i18n and no store. If a task needs localized copy or state, install and register the module in `nuxt.config.ts`.
