import './assets/main.css'
import './assets/blueprint.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes'
import '@unocss/reset/tailwind.css'
import 'uno.css'

// pinia and vue-i18n were registered here but nothing in the app used them
// (no store imports, no $t/useI18n) — dropping them cuts ~50KB of dead JS
// from the critical bundle on every page. Re-add when a feature needs them.
export const createApp = ViteSSG(App, { routes })
