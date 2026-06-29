<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    sticky top-0 z-50
    transition-all duration-300
    class="bp-nav"
    :class="isScrolled ? 'bp-nav--scrolled' : ''"
  >
    <nav w-full>
      <div mx-auto flex items-center justify-between gap-4 px-5 py-3 relative class="bp-nav__row">
        <!-- Drawing title block -->
        <router-link to="/" class="bp-nav__brand bp-mono" aria-label="Home">
          <BlueprintLogo :size="25" />
        </router-link>

        <!-- Floor index -->
        <div class="bp-nav__index bp-mono">
          <router-link to="/projects" class="bp-nav__link" active-class="is-active">
            <span class="bp-nav__code">03</span>Projects
          </router-link>
          <router-link to="/blogs" class="bp-nav__link" active-class="is-active">
            <span class="bp-nav__code">04</span>Blogs
          </router-link>
          <Darkmode class="bp-nav__theme" aria-label="Toggle theme" />
        </div>
      </div>
      <div class="bp-nav__rule" aria-hidden="true" />
    </nav>
  </header>
</template>

<style scoped>
.bp-nav {
  background: transparent;
}
.bp-nav--scrolled {
  background: color-mix(in srgb, var(--bp-canvas) 78%, transparent);
  backdrop-filter: blur(10px);
}

.bp-nav__row {
  width: 100%;
  max-width: 60rem;
}

.bp-nav__rule {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--bp-line) 12%,
    var(--bp-line) 88%,
    transparent
  );
  opacity: 0.7;
}

/* title block */
.bp-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 11px;
  color: var(--bp-blue);
  text-decoration: none;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--bp-line-soft);
}
.bp-nav__brand:hover { border-color: var(--bp-line); }
.bp-nav__brand-id { font-weight: 700; letter-spacing: 0.2em; }
.bp-nav__brand-sub { opacity: 0.6; }
@media (max-width: 520px) {
  .bp-nav__brand-sub { display: none; }
}

/* floor index links */
.bp-nav__index {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 11px;
}
.bp-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.65rem;
  color: var(--bp-blue);
  opacity: 0.72;
  text-decoration: none;
  border: 1px solid transparent;
  transition: opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.bp-nav__link:hover {
  opacity: 1;
  border-color: var(--bp-line-soft);
}
.bp-nav__link.is-active {
  opacity: 1;
  border-color: var(--bp-line);
  background: var(--bp-line-faint);
}
.bp-nav__code {
  font-size: 9px;
  opacity: 0.55;
}
@media (max-width: 520px) {
  .bp-nav__code { display: none; }
  .bp-nav__link { padding: 0.4rem 0.5rem; }
}

.bp-nav__theme {
  margin-left: 0.25rem;
  color: var(--bp-blue);
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
}
</style>
