<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { resumeSEO } from '../utils/tags'

useHead(resumeSEO)

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/resume.pdf'
  link.download = 'resume.pdf'
  link.click()
}
</script>

<template>
  <div max-w-4xl mx-auto min-h-screen text-black dark:text-white px-4 py-8>

    <!-- Top Download Button -->
    <div flex justify-end mb-6>
      <button
        @click="downloadResume"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-80 transition-all duration-200 shadow-lg hover:scale-105"
      >
        <i class="i-carbon:download w-4 h-4" />
        Download CV
      </button>
    </div>

    <!-- Resume Card -->
    <div class="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-4xl rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden">
      <div p-8 md:p-12>

        <!-- Header -->
        <div text-center mb-8>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">Mohamed Mostafa</h1>
          <p class="text-base font-semibold text-gray-600 dark:text-gray-400 mb-3">Software Engineer</p>
          <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Banha, Al Qalyubia</span>
            <span class="text-gray-300 dark:text-gray-600">·</span>
            <a href="mailto:mohamed.mostafa0699@gmail.com" class="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              mohamed.mostafa0699@gmail.com
            </a>
            <span class="text-gray-300 dark:text-gray-600">·</span>
            <a href="tel:+201142314446" class="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              +201142314446
            </a>
            <span class="text-gray-300 dark:text-gray-600">·</span>
            <a href="https://www.linkedin.com/in/elrefai99/" target="_blank" class="hover:text-gray-600 dark:hover:text-gray-400 underline transition-colors">LinkedIn</a>
            <span class="text-gray-300 dark:text-gray-600">·</span>
            <a href="https://elrefai.me" target="_blank" class="hover:text-gray-600 dark:hover:text-gray-400 underline transition-colors">Portfolio</a>
            <span class="text-gray-300 dark:text-gray-600">·</span>
            <a href="https://github.com/elrefai99" target="_blank" class="hover:text-gray-600 dark:hover:text-gray-400 underline transition-colors">GitHub</a>
          </div>
        </div>

        <!-- Summary -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Summary</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-3" />
          <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Software Engineer with 2+ years of experience building production-grade backend systems using Node.js
            and TypeScript. Proven track record in developing scalable APIs, payment integrations, and monolithic
            architectures.
          </p>
        </section>

        <!-- Experience -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Experience</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-4" />

          <div>
            <div flex items-baseline justify-between flex-wrap gap-2 mb-2>
              <div class="flex items-baseline gap-1.5 flex-wrap">
                <span class="text-sm font-bold text-gray-900 dark:text-white">Backend Engineer</span>
                <span class="text-sm text-gray-400">|</span>
                <a href="https://lesoll.com" target="_blank" class="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:underline">Lesoll</a>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">Jun 2023 – Present · Cairo, Egypt · On-site</span>
            </div>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Developed and maintained scalable backend services for the Lesoll platform and Egystay platform.</li>
              <li>Developed key features: Payment system (PayMob &amp; Amazon Payment Services), admin dashboard, chat system, notifications, email/SMS/OTP, traffic scraping (Puppeteer), CoHost system, Cancellation policy, booking, reports, and employee tools.</li>
              <li>Deployed Lesoll via Docker + AWS EC2; deployed Egystay via Docker + AWS EKS + Render.</li>
            </ul>
          </div>
        </section>

        <!-- Projects -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Projects</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-4" />

          <!-- Gosha -->
          <div mb-5>
            <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Gosha — AI Prompt Optimization Engine</h3>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Architected a self-learning prompt optimization engine that rewrites raw user input into structured, model-specific prompts (Claude XML / GPT Markdown) using a weighted rule system — zero external AI API calls.</li>
              <li>Designed a 5-phase processing pipeline (Analyze → Learn → Transform → Merge → Record) with a feedback loop that adjusts rule weights from user ratings, enabling category-specific personalization over time.</li>
              <li>Built a full SaaS backend with JWT/PASETO auth, tiered subscription billing (Free → Enterprise), dual payment integration (Stripe international + Paymob MENA card &amp; wallet), and a daily token ledger per plan.</li>
              <li>Implemented real-time notifications via SSE backed by Redis pub/sub, async email jobs with BullMQ, structured logging with Pino, and a Prometheus metrics endpoint for observability.</li>
            </ul>
          </div>

          <!-- gen-import -->
          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2">gen-import — TypeScript Barrel File Generator</h3>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Built a zero-dependency CLI tool that auto-generates barrel files (index.ts) for Node.js/Express/TypeScript projects using the TypeScript compiler API for accurate AST-level export detection.</li>
              <li>Implemented <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">--init</code> command that injects tsconfig path aliases and package.json scripts idempotently, with <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">--alias</code> flag support for custom path prefixes.</li>
              <li>Added <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono">--watch</code> mode using native fs.watch (no chokidar), enabling real-time barrel regeneration on file changes with zero runtime dependencies.</li>
              <li>Enforced separation of type-only exports (interface, type) from value exports to prevent runtime bootstrap errors; supports CommonJS and ESM output targets.</li>
            </ul>
          </div>
        </section>

        <!-- Education -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Education</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-4" />
          <p class="text-sm text-gray-700 dark:text-gray-300">
            <span class="font-bold text-gray-900 dark:text-white">Bachelor of Computer Science</span>
            <span class="text-gray-500 dark:text-gray-400"> · Modern Academy – Maadi, Cairo, Jul 2022</span>
          </p>
        </section>

        <!-- Technical Skills -->
        <section>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Technical Skills</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-4" />

          <div class="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
            <p><span class="font-bold text-gray-900 dark:text-white">Languages:</span> HTML, CSS, JavaScript, TypeScript</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Backend:</span> Node.js, Express.js, RESTful APIs, Monolithic &amp; Microservices Architecture, Cache, Message Queue, WebSockets</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Frontend:</span> Vue.js, Vite, TailwindCSS, UnoCSS, Firebase</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Databases:</span> MongoDB, PostgreSQL — Design &amp; Optimization, Transactions, Indexing</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Cloud &amp; DevOps:</span> AWS (EC2, EKS), Docker &amp; Docker Compose, CI/CD (GitHub Actions), Nginx</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Payments:</span> Amazon Payment Services, Paymob, Stripe, Webhook Handling</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Tooling:</span> BullMQ, Pino, Prometheus, Socket.IO, SSE, Redis, Puppeteer, TypeScript Compiler API</p>
          </div>
        </section>

      </div>
    </div>

    <!-- Bottom Download Button -->
    <div flex justify-center mt-8 mb-4>
      <button
        @click="downloadResume"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-80 transition-all duration-200 shadow-lg hover:scale-105"
      >
        <i class="i-carbon:download w-5 h-5" />
        Download CV
      </button>
    </div>

  </div>
</template>
