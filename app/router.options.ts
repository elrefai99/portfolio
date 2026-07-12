import type { RouterConfig } from '@nuxt/schema'

// Ported verbatim from the old vite-ssg scrollBehavior:
// back/forward restores the position the user left; anchor links scroll to
// their target; every other navigation lands at the top of the page.
// behavior:'instant' overrides the global `scroll-behavior: smooth` so a new
// page doesn't visibly scroll up from wherever the old one was.
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, left: 0, behavior: 'instant' }
  },
}
