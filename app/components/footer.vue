<template>
  <footer class="bp-footer">
    <!-- foundation slab -->
    <div class="bp-foundation" aria-hidden="true">
      <span class="bp-slab__label bp-slab__label--left">FOUNDATION · GRADE 0</span>
      <span class="bp-slab__label">EL ±0.00 m</span>
    </div>

    <div class="bp-footer__inner">
      <!-- Social Links -->
      <div flex gap-4 justify-center mb-8>
        <a
          class="social-link"
          href="https://github.com/elrefai99"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          aria-label="GitHub"
        >
          <i class="i-carbon-logo-github social-icon" aria-hidden="true"></i>
        </a>
        <a
          class="social-link"
          href="https://www.linkedin.com/in/elrefai99/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          aria-label="LinkedIn"
        >
          <i class="i-carbon-logo-linkedin social-icon" aria-hidden="true"></i>
        </a>
        <a
          class="social-link"
          href="https://x.com/elrefai99"
          target="_blank"
          rel="noopener noreferrer"
          title="X (Twitter)"
          aria-label="X"
        >
          <i class="i-carbon-logo-x social-icon" aria-hidden="true"></i>
        </a>
        <a
          class="social-link"
          href="https://bsky.app/profile/elrefai.me"
          target="_blank"
          rel="noopener noreferrer"
          title="Bluesky"
          aria-label="Bluesky"
        >
          <i class="i-ri:bluesky-fill social-icon" aria-hidden="true"></i>
        </a>
        <a
          class="social-link"
          href="mailto:elrefai99@gmail.com"
          title="Email"
          aria-label="Email"
        >
          <i class="i-mdi:email-outline social-icon" aria-hidden="true"></i>
        </a>
      </div>

      <!-- Datum / copyright -->
      <p class="bp-mono bp-footer__datum">
        © {{ year }}
        <a href="https://github.com/elrefai99" target="_blank" rel="noopener noreferrer"
          >elrefai99</a
        >
        · DWG MM-001 · ALL RIGHTS RESERVED
      </p>

      <!-- Back to Top -->
      <button
        @click="scrollToTop"
        title="Back to top"
        aria-label="Scroll to top"
        class="bp-totop"
      >
        <i class="i-carbon:arrow-up"></i>
      </button>
    </div>
  </footer>
</template>

<script setup>
// The site is statically generated, so a year rendered during prerender freezes
// at the build date. Seed with the build year (keeps SSR and the first client
// render identical — no hydration mismatch) and correct it after mount.
const year = ref(new Date().getFullYear());
onMounted(() => {
  year.value = new Date().getFullYear();
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.bp-footer {
  margin-top: 4rem;
}
.bp-foundation {
  position: relative;
  max-width: 60rem;
  margin: 0 auto;
  height: 30px;
  border-top: 1px solid var(--bp-line);
  border-bottom: 1px solid var(--bp-line);
  background-image: repeating-linear-gradient(
    45deg,
    var(--bp-line-soft) 0,
    var(--bp-line-soft) 1px,
    transparent 1px,
    transparent 9px
  );
}
.bp-footer__inner {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 2.5rem;
  text-align: center;
  position: relative;
}
.bp-footer__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem 1.25rem;
  margin-bottom: 1.75rem;
  font-size: 11px;
}
.bp-footer__nav a {
  color: var(--bp-blue);
  opacity: 0.72;
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.bp-footer__nav a:hover {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.bp-footer__datum {
  font-size: 10px;
  color: var(--bp-blue);
  opacity: 0.8;
}
.bp-footer__datum a {
  color: var(--bp-blue);
  font-weight: 700;
  text-decoration: none;
}
.bp-footer__datum a:hover {
  text-decoration: underline;
}

.bp-totop {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--bp-blue);
  background: color-mix(in srgb, var(--bp-canvas) 70%, transparent);
  border: 1px solid var(--bp-line);
  cursor: pointer;
  z-index: 40;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}
.bp-totop:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 18px rgba(var(--bp-accent-rgb), 0.35);
}
</style>
