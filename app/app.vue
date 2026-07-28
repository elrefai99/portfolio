<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <a href="#main-content" class="bp-skip-link">Skip to content</a>
  <NavBar />
  <BackGround />
  <!-- Roof datum: top of the building section -->
  <div class="bp-roof" aria-hidden="true">
    <div class="bp-roof__inner">
      <span class="bp-roof__tick" />
      <span class="bp-mono">ROOF · DATUM +24.00 m</span>
      <span class="bp-roof__tick" />
    </div>
  </div>
  <div id="main-content" tabindex="-1">
    <NuxtPage />
  </div>
  <Footer />
  <ClientOnly>
    <Analytics />
    <SpeedInsights />
  </ClientOnly>
</template>

<style>
html.dark {
  background: var(--bp-canvas);
  color: var(--color-text);
  color-scheme: dark;
}

/* Keyboard skip link: off-screen until focused, then pinned top-left. */
.bp-skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem; /* 44px min tap target for mobile */
  padding: 0.6rem 1rem;
  font-size: 12px;
  color: var(--bp-blue);
  background: var(--bp-canvas);
  border: 1px solid var(--bp-line);
}
.bp-skip-link:focus {
  left: 0.5rem;
  top: 0.5rem;
}
/* The skip target is programmatically focusable but shouldn't show a focus ring. */
#main-content:focus {
  outline: none;
}
.bp-skip-link:focus-visible {
  outline-offset: -2px;
}

/* Roof line marking the top of the building elevation */
.bp-roof {
  max-width: 60rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 0;
}
.bp-roof__inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 10px;
  color: var(--bp-blue);
  border-top: 1px solid var(--bp-line);
  padding-top: 0.5rem;
}
.bp-roof__tick {
  height: 8px;
  width: 1px;
  background: var(--bp-line);
}
.bp-roof__inner .bp-mono {
  white-space: nowrap;
}
.bp-roof__inner::after {
  content: "";
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    var(--bp-line-soft) 0,
    var(--bp-line-soft) 6px,
    transparent 6px,
    transparent 12px
  );
}
</style>
