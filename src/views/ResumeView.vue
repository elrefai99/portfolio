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
  <FloorSection level="L-05" name="Dossier / Curriculum Vitae" elevation="+0.00 m" :top-slab="false">
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
    <div class="timeline-content flex-1 mb-4 p-4 rounded-xl backdrop-blur-sm bg-white/10 dark:bg-white/8 border border-black/10 dark:border-white/14 shadow-md transition-all duration-300 group-hover:shadow-xl">
      <div p-8 md:p-12>

        <!-- Header -->
        <div text-center mb-8>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-1">Mohamed Mostafa</h1>
          <p class="text-base font-semibold text-gray-600 dark:text-gray-400 mb-3">Software Engineer</p>
          <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Banha, Al Qalyubia</span>
            <span class="text-gray-300 dark:text-gray-600">•</span>
            <a href="mailto:mohamed.mostafa0699@gmail.com" class="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              mohamed.mostafa0699@gmail.com
            </a>
            <span class="text-gray-300 dark:text-gray-600">•</span>
            <a href="tel:+201142314446" class="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              +20 114 231 4446
            </a>
            <span class="text-gray-300 dark:text-gray-600">•</span>
            <div>
                <a href="https://www.linkedin.com/in/elrefai99/" target="_blank" class="m2 hover:text-gray-600 dark:hover:text-gray-400 underline transition-colors">LinkedIn</a>
                <span class="text-gray-300 dark:text-gray-600">•</span>
                <a href="https://elrefai.me" target="_blank" class="m2 hover:text-gray-600 dark:hover:text-gray-400 underline transition-colors">Portfolio</a>
                <span class="text-gray-300 dark:text-gray-600">•</span>
                <a href="https://github.com/elrefai99" target="_blank" class="m2 hover:text-gray-600 dark:hover:text-gray-400 underline transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Summary</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-3" />
          <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Backend Engineer with 3+ years of building and operating production payment systems and real-time
            services in Node.js and TypeScript. Shipped multi-provider payment integrations (PayMob, Amazon
            Payment Services, Stripe), event-driven background processing, and SSE/WebSocket notifications across
            two live marketplace platforms. Focused on reliability, idempotency, and performance under real
            transaction volume.
          </p>
        </section>

        <!-- Experience -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Experience</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-4" />

          <div>
            <div flex items-baseline justify-between flex-wrap gap-2 mb-2>
              <div class="flex items-baseline gap-1.5 flex-wrap">
                <span class="text-sm font-bold text-gray-900 dark:text-white">Software Engineer II</span>
                <span class="text-sm text-gray-400">|</span>
                <a href="https://lesoll.com" target="_blank" class="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:underline">Lesoll</a>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">Jun 2023 – Present · Cairo, Egypt · On-site</span>
            </div>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Leading backend architecture and development for large-scale hospitality platforms.</li>
              <li>Built and operated the payment system integrating PayMob and Amazon Payment Services, processing ~10K transactions/month with HMAC-verified webhooks and idempotent handlers that guarantee zero double-charges.</li>
              <li>Developed scalable background processing and real-time communication systems using Redis, BullMQ, and WebSockets.</li>
              <li>Improved API performance and optimized database operations across critical services.</li>
              <li>Delivered core business features, including booking, reporting, CoHost management, and employee tools.</li>
              <li>Managed AWS infrastructure, Docker deployments, and CI/CD pipelines.</li>
            </ul>
          </div>
        </section>

        <!-- Projects -->
        <section mb-7>
          <h2 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-widest">Projects</h2>
          <hr class="border-gray-200 dark:border-gray-900 mb-4" />

          <!-- SRVJ -->
          <div>
            <div class="flex items-baseline gap-1.5 flex-wrap mb-2">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">SRVJ — Real-Time Collaborative Whiteboard Platform</h3>
              <a href="https://srvj.elrefai.me/" target="_blank" class="text-xs font-semibold text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-white transition-colors">Live</a>
            </div>
            <ul class="list-disc pl-5 space-y-1.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Built real-time collaborative diagram editing using Yjs CRDTs over a custom WebSocket server implementing the Yjs sync and awareness protocols, enabling live cursors, presence, and seamless multiplayer editing.</li>
              <li>Secured WebSocket connections with PASETO v4 authentication and enforced project-level role-based access control, while isolating collaboration sessions into dedicated board rooms.</li>
              <li>Designed a dual-snapshot persistence layer that stores both the authoritative Yjs binary state for lossless recovery and a denormalized JSON representation for efficient querying and API reads.</li>
              <li>Architected the backend using PostgreSQL/Prisma for relational data (users, projects, memberships, sharing) and MongoDB/Mongoose for high-frequency diagram mutations.</li>
              <li>Implemented horizontally scalable notifications using SSE with Redis Pub/Sub fan-out, alongside BullMQ workers for asynchronous email and notification processing.</li>
              <li>Improved platform reliability and security through Zod validation, Helmet, CORS, rate limiting, centralized error handling, structured logging with Pino, and Prometheus metrics. Verified collaboration behavior with integration tests and containerized the platform using Docker Compose behind Nginx.</li>
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
            <p><span class="font-bold text-gray-900 dark:text-white">Backend:</span> Node.js, Express.js, TypeScript, RESTful APIs, WebSockets, SSE</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Databases &amp; Caching:</span> MongoDB, Mongoose, PostgreSQL, Prisma, Redis</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Messaging &amp; Async:</span> BullMQ, message queues, Redis pub/sub</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Payments:</span> PayMob, Amazon Payment Services, Stripe (webhooks, HMAC, idempotency)</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Cloud &amp; DevOps:</span> AWS (EC2, EKS, S3, ECR), Docker &amp; Docker Compose, GitHub Actions CI/CD</p>
            <p><span class="font-bold text-gray-900 dark:text-white">Frontend:</span> Vue.js, Vite, TailwindCSS, UnoCSS</p>
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
  </FloorSection>
</template>
