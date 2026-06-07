<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { contactSEO } from '../utils/tags'

useHead(contactSEO)

const socials = [
  {
    label: 'Email',
    value: 'mohamed.mostafa0699@gmail.com',
    href: 'mailto:mohamed.mostafa0699@gmail.com',
    icon: 'i-carbon:email',
  },
  {
    label: 'Phone',
    value: '+20 114234446',
    href: 'tel:+20114234446',
    icon: 'i-carbon:phone',
  },
  {
    label: 'LinkedIn',
    value: 'in/elrefai99',
    href: 'https://www.linkedin.com/in/elrefai99/',
    icon: 'i-mdi:linkedin',
  },
  {
    label: 'X',
    value: '@elrefai99',
    href: 'https://x.com/elrefai99',
    icon: 'i-ri:twitter-x-fill',
  },
]

const form = reactive({
  name: '',
  email: '',
  message: '',
  company: '', // honeypot — must stay empty
})

type Status = 'idle' | 'sending' | 'success' | 'error'
const status = ref<Status>('idle')
const errorMessage = ref('')

const isSending = computed(() => status.value === 'sending')

const submit = async () => {
  if (isSending.value) return

  status.value = 'sending'
  errorMessage.value = ''

  try {
    // The Resend API key is secret and Resend blocks browser calls, so the
    // actual send runs server-side in the Netlify function (/api/contact).
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.')
    }

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    status.value = 'error'
    errorMessage.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <div max-w-2xl mx-auto min-h-screen text-black dark:text-white px-4 py-8>
    <section class="animate-fade-in">
      <h1 text-3xl font-bold mb-1 tracking-tight>Contact</h1>
      <p text-base text-gray-700 dark:text-gray-300 mb-6>Let's connect.</p>

      <p text-sm text-gray-600 dark:text-gray-400 mb-4>
        Connect with me through any of these platforms.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-3 p-4 rounded-xl bg-white/70 dark:bg-white/8 backdrop-blur-xl border border-black/10 dark:border-white/14 shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
        >
          <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 shrink-0">
            <i :class="[social.icon, 'w-5 h-5']" />
          </span>
          <div class="min-w-0">
            <p font-semibold text-sm>{{ social.label }}</p>
            <p text-xs text-gray-500 dark:text-gray-400 truncate>{{ social.value }}</p>
          </div>
        </a>
      </div>

      <h2 text-2xl font-bold mb-2 tracking-tight>Get in touch</h2>
      <p text-sm text-gray-600 dark:text-gray-400 mb-8>
        Have a project, role, or idea in mind? Send a message and I'll get back to you.
      </p>

      <form
        @submit.prevent="submit"
        class="bg-white/70 dark:bg-white/8 backdrop-blur-xl rounded-2xl shadow-xl border border-black/10 dark:border-white/14 p-6 md:p-8 flex flex-col gap-5"
      >
        <div class="flex flex-col gap-2">
          <label for="name" text-sm font-medium>Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            :disabled="isSending"
            autocomplete="name"
            placeholder="Your name"
            class="w-full px-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-black/15 dark:border-white/15 outline-none transition-all duration-200 focus:border-black/40 dark:focus:border-white/40 disabled:opacity-60"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="email" text-sm font-medium>Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :disabled="isSending"
            autocomplete="email"
            placeholder="you@example.com"
            class="w-full px-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-black/15 dark:border-white/15 outline-none transition-all duration-200 focus:border-black/40 dark:focus:border-white/40 disabled:opacity-60"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="message" text-sm font-medium>Message</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            :disabled="isSending"
            rows="6"
            maxlength="5000"
            placeholder="Write your message…"
            class="w-full px-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-black/15 dark:border-white/15 outline-none transition-all duration-200 focus:border-black/40 dark:focus:border-white/40 disabled:opacity-60 resize-y"
          />
        </div>

        <!-- Honeypot: hidden from users, catches bots -->
        <input
          v-model="form.company"
          type="text"
          name="company"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          class="hidden"
        />

        <button
          type="submit"
          :disabled="isSending"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-sm transition-all duration-200 shadow-lg hover:opacity-80 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <i v-if="isSending" class="i-carbon:circle-dash w-4 h-4 animate-spin" />
          <i v-else class="i-carbon:send w-4 h-4" />
          {{ isSending ? 'Sending…' : 'Send message' }}
        </button>

        <p
          v-if="status === 'success'"
          class="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
        >
          <i class="i-carbon:checkmark-outline w-4 h-4" />
          Thanks! Your message has been sent.
        </p>
        <p
          v-else-if="status === 'error'"
          class="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
        >
          <i class="i-carbon:warning-alt w-4 h-4" />
          {{ errorMessage }}
        </p>
      </form>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
