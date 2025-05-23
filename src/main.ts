import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { createHead } from '@vueuse/head'
import { createI18n } from 'vue-i18n'
import messages from './locales'

const app = createApp(App)
const head = createHead()

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

app.use(head)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
