import './assets/main.css'
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router/routes'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { createI18n } from 'vue-i18n'
import messages from './locales'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, isClient }) => {
    app.use(createPinia())
    app.use(
      createI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages,
      }),
    )

    if (isClient) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme-preference', 'dark')
    }
  },
)
