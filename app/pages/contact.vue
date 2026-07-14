<script setup lang="ts">
import { contactSEO } from "~~/shared/utils/seo/contact";

useHead(contactSEO);

const channels = [
  {
    label: "Email",
    handle: "elrefai99@gmail.com",
    href: "mailto:elrefai99@gmail.com",
    icon: "i-carbon:email",
    external: false,
  },
  {
    label: "GitHub",
    handle: "github.com/elrefai99",
    href: "https://github.com/elrefai99",
    icon: "i-carbon-logo-github",
    external: true,
  },
  {
    label: "LinkedIn",
    handle: "in/elrefai99",
    href: "https://www.linkedin.com/in/elrefai99/",
    icon: "i-carbon-logo-linkedin",
    external: true,
  },
  {
    label: "X (Twitter)",
    handle: "@elrefai99",
    href: "https://x.com/elrefai99",
    icon: "i-carbon-logo-x",
    external: true,
  },
];

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
  // Honeypot — hidden from humans; a filled value marks the submit as a bot.
  company: "",
});

const status = ref<"idle" | "sending" | "sent" | "error">("idle");
const errorMessage = ref("");

const submit = async () => {
  if (status.value === "sending") return;
  status.value = "sending";
  errorMessage.value = "";
  try {
    await $fetch("/api/contact", { method: "POST", body: { ...form } });
    status.value = "sent";
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
  } catch (err: any) {
    status.value = "error";
    errorMessage.value =
      err?.data?.error ??
      "Sending failed. Please try again later or email me directly.";
  }
};
</script>

<template>
  <main>
    <FloorSection
      level="L-05"
      name="Contact / Communications"
      elevation="+0.00 m"
      :top-slab="false"
      eager
    >
      <div
        max-w-4xl
        mx-auto
        min-h-screen
        text-black
        dark:text-white
        flex
        justify-center
        items-start
      >
        <div w-full max-w-4xl p-4 md:p-10>
          <!-- Visible breadcrumb corroborating the Contact BreadcrumbList JSON-LD -->
          <nav aria-label="Breadcrumb" class="bp-mono mb-6 text-xs">
            <ol class="flex flex-wrap items-center gap-2">
              <li><router-link to="/" class="bp-tab">Home</router-link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" class="opacity-70">Contact</li>
            </ol>
          </nav>

          <section>
            <div class="mb-10 flex flex-col items-center text-center">
              <h1 text-5xl font-bold mb-2 text-black dark:text-white>
                Contact Mohammed Mostafa
              </h1>
              <p text-sm text-gray-500 dark:text-gray-400 max-w-2xl>
                Let's connect — reach me through any of these platforms, or send
                a message straight from the form below.
              </p>
            </div>

            <!-- Direct channels -->
            <h2 class="bp-mono mb-4 text-xs opacity-70">Direct Channels</h2>
            <div class="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                v-for="(channel, index) in channels"
                :key="channel.label"
                :href="channel.href"
                :target="channel.external ? '_blank' : undefined"
                :rel="channel.external ? 'noopener noreferrer' : undefined"
                class="bp-card animate-project-rise"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <span class="flex items-center gap-4 p-5">
                  <span class="bp-icon-btn shrink-0">
                    <i :class="channel.icon" aria-hidden="true" />
                  </span>
                  <span class="min-w-0">
                    <span class="block font-semibold text-black dark:text-gray-300">
                      {{ channel.label }}
                    </span>
                    <span class="block truncate text-sm text-gray-500 dark:text-gray-400">
                      {{ channel.handle }}
                    </span>
                  </span>
                </span>
              </a>
            </div>

            <!-- Message form -->
            <h2 class="bp-mono mb-4 text-xs opacity-70">Send a Message</h2>
            <form
              class="bp-panel animate-project-rise p-6 md:p-8"
              style="animation-delay: 0.4s"
              @submit.prevent="submit"
            >
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div class="bp-field">
                  <label for="contact-name" class="bp-mono">Name</label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    name="name"
                    class="bp-input"
                    placeholder="Your name"
                    required
                    maxlength="100"
                    autocomplete="name"
                  />
                </div>
                <div class="bp-field">
                  <label for="contact-email" class="bp-mono">Email</label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="bp-input"
                    placeholder="you@example.com"
                    required
                    maxlength="254"
                    autocomplete="email"
                  />
                </div>
              </div>

              <div class="bp-field mt-5">
                <label for="contact-subject" class="bp-mono">Subject</label>
                <input
                  id="contact-subject"
                  v-model="form.subject"
                  type="text"
                  name="subject"
                  class="bp-input"
                  placeholder="What is this about?"
                  required
                  maxlength="150"
                />
              </div>

              <div class="bp-field mt-5">
                <label for="contact-message" class="bp-mono">Message</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  class="bp-input resize-y"
                  placeholder="Tell me about your project, question, or idea…"
                  required
                  rows="6"
                  maxlength="5000"
                />
              </div>

              <!-- Honeypot: hidden from humans, tempting for bots -->
              <div class="bp-honeypot" aria-hidden="true">
                <label for="contact-company">Company</label>
                <input
                  id="contact-company"
                  v-model="form.company"
                  type="text"
                  name="company"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  class="bp-tab bp-submit"
                  :disabled="status === 'sending'"
                >
                  <i
                    :class="status === 'sending' ? 'i-carbon:circle-dash animate-spin' : 'i-carbon:send'"
                    aria-hidden="true"
                  />
                  {{ status === "sending" ? "Transmitting…" : "Send Message" }}
                </button>

                <p
                  v-if="status === 'sent'"
                  class="bp-mono text-xs text-green-600 dark:text-green-400"
                  role="status"
                >
                  ✓ Message received — I'll get back to you soon.
                </p>
                <p
                  v-else-if="status === 'error'"
                  class="bp-mono text-xs text-red-600 dark:text-red-400"
                  role="alert"
                >
                  ✗ {{ errorMessage }}
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
    </FloorSection>
  </main>
</template>

<style scoped>
.bp-field label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 10px;
  color: var(--bp-blue);
  opacity: 0.7;
}

.bp-input {
  width: 100%;
  padding: 0.65rem 0.8rem;
  font-size: 0.9rem;
  color: var(--bp-blue);
  background: var(--bp-line-faint);
  border: 1px solid var(--bp-line-soft);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.bp-input:focus {
  outline: none;
  border-color: var(--bp-line);
  background: transparent;
}
.bp-input::placeholder {
  color: var(--bp-blue-dim);
  opacity: 0.55;
}

.bp-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.bp-submit:disabled {
  opacity: 0.55;
  cursor: wait;
}

/* Honeypot: off-screen but focusable-by-bots. display:none would be skipped
   by naive bots; keep it rendered yet invisible and out of the tab order. */
.bp-honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
