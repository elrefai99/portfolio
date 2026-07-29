<script setup lang="ts">
import { resumeSEO } from "~~/shared/utils/seo/resume";

useHead(resumeSEO);
</script>

<template>
  <main>
    <FloorSection
      level="L-05"
      name="Dossier / Curriculum Vitae"
      elevation="+0.00 m"
      :top-slab="false"
      eager
    >
      <div max-w-4xl mx-auto min-h-screen text-[var(--bp-blue)] px-4 py-8>
        <nav aria-label="Breadcrumb" class="bp-mono mb-6 text-xs">
          <ol class="flex flex-wrap items-center gap-2">
            <li><router-link to="/" class="bp-tab">Home</router-link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" class="opacity-70">Resume</li>
          </ol>
        </nav>

        <!-- Top Download Button -->
        <!-- Real <a href> (not a JS-triggered download) so the PDF is crawlable -->
        <div flex justify-end mb-6>
          <a
            href="/resume.pdf"
            download
            class="inline-flex items-center min-h-11 gap-2 px-4 py-2 rounded-lg bg-[var(--bp-blue)] text-[var(--bp-canvas)] font-semibold text-sm hover:opacity-80 transition-all duration-200 shadow-lg hover:scale-105"
          >
            <i class="i-carbon:download w-4 h-4" />
            Download CV
          </a>
        </div>

        <!-- Resume Card -->
        <div
          class="timeline-content flex-1 mb-4 p-4 rounded-xl backdrop-blur-sm bg-[rgba(var(--bp-line-rgb),0.06)] border border-[var(--bp-line-soft)] shadow-md transition-all duration-300 group-hover:shadow-xl"
        >
          <div p-8 md:p-12>
            <!-- Header -->
            <div text-center mb-8>
              <h1 class="text-4xl font-bold text-[var(--bp-blue)] mb-1">
                Mohammed Mostafa
              </h1>

              <p class="text-base font-semibold text-[var(--bp-blue-dim)] mb-3">
                <span class="text-[var(--bp-muted)] m1">•</span>
                Software Engineer
                <span class="text-[var(--bp-muted)] m1">•</span>
              </p>
              <div
                class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm text-[var(--bp-blue-dim)]"
              >
                <span class="text-[var(--bp-muted)]">•</span>
                <span>Banha, Al Qalyubia</span>
                <span class="text-[var(--bp-muted)]">•</span>
                <a
                  href="mailto:elrefai99@gmail.com"
                  class="inline-flex items-center min-h-11 hover:text-[var(--bp-blue-dim)] transition-colors"
                >
                  elrefai99@gmail.com
                </a>
                <span class="text-[var(--bp-muted)]">•</span>
                <a
                  href="tel:+201142314446"
                  class="inline-flex items-center min-h-11 hover:text-[var(--bp-blue-dim)] transition-colors"
                >
                  +20 114 231 4446
                </a>
                <span class="text-[var(--bp-muted)]">•</span>
              <br>
                <div>
                  <span class="text-[var(--bp-muted)]">•</span>
                  <a
                    href="https://www.linkedin.com/in/elrefai99/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="m2 inline-flex items-center min-h-11 hover:text-[var(--bp-blue-dim)] underline transition-colors"
                    >LinkedIn</a
                  >
                  <span class="text-[var(--bp-muted)]">•</span>
                  <!-- Own site: an internal route, not an external _blank link. -->
                  <router-link
                    to="/"
                    class="m2 inline-flex items-center min-h-11 hover:text-[var(--bp-blue-dim)] underline transition-colors"
                    >Portfolio</router-link
                  >
                  <span class="text-[var(--bp-muted)]">•</span>
                  <a
                    href="https://github.com/elrefai99"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="m2 inline-flex items-center min-h-11 hover:text-[var(--bp-blue-dim)] underline transition-colors"
                    >GitHub</a
                  >
                  <span class="text-[var(--bp-muted)]">•</span>
                </div>
              </div>
            </div>

            <!-- Summary -->
            <section mb-7>
              <h2
                class="text-sm font-bold text-[var(--bp-blue-dim)] mb-2 uppercase tracking-widest"
              >
                Summary
              </h2>
              <hr class="border-[var(--bp-line-soft)] mb-3" />
              <p class="text-sm text-[var(--bp-blue-dim)] leading-relaxed">
                Backend Engineer with 3+ years of experience building and maintaining
                production backend systems using Node.js and TypeScript. Experienced in
                designing scalable APIs, real-time services, background processing, cloud
                infrastructure, and payment integrations. Built and operated the backend
                for live marketplace platforms, focusing on performance, reliability,
                maintainability, and clean system design.
              </p>
            </section>

            <!-- Experience -->
            <section mb-7>
              <h2
                class="text-sm font-bold text-[var(--bp-blue-dim)] mb-2 uppercase tracking-widest"
              >
                Experience
              </h2>
              <hr class="border-[var(--bp-line-soft)] mb-4" />

              <div>
                <div flex items-baseline justify-between flex-wrap gap-2 mb-2>
                  <div class="flex items-baseline gap-1.5 flex-wrap">
                    <h3 class="text-sm font-bold text-[var(--bp-blue)]">
                      Software Engineer II
                    </h3>
                    <span class="text-sm text-[var(--bp-muted)]">|</span>
                    <a
                      href="https://lesoll.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm font-semibold text-[var(--bp-blue-dim)] hover:underline"
                      >Lesoll</a
                    >
                  </div>
                  <span class="text-xs text-[var(--bp-muted)]"
                    >Jun 2023 – Jul 2026 · Cairo, Egypt · On-site</span
                  >
                </div>
                <p class="text-sm text-[var(--bp-blue-dim)] leading-relaxed mb-2">
                  Worked as the sole Backend Engineer responsible for developing and
                  maintaining the backend systems for Lesoll and EgyStay, managing
                  production infrastructure, cloud services, and third-party integrations.
                </p>
                <ul
                  class="list-disc pl-5 space-y-1.5 text-sm text-[var(--bp-blue-dim)] leading-relaxed"
                >
                  <li>
                    Developed and maintained scalable REST APIs using Node.js, Express.js,
                    TypeScript, and MongoDB.
                  </li>
                  <li>
                    Built backend services for authentication, property management,
                    bookings, payments, reporting, and admin operations.
                  </li>
                  <li>
                    Implemented Redis caching and BullMQ background jobs to improve
                    performance and reduce database load.
                  </li>
                  <li>
                    Developed real-time features using Socket.IO, including chat,
                    notifications, and online user tracking.
                  </li>
                  <li>
                    Integrated Paymob and Amazon Payment Services, implementing secure
                    payment workflows and webhook processing.
                  </li>
                  <li>
                    Managed production infrastructure using AWS (EC2, S3, CloudFront,
                    Route 53), Docker, Nginx, PM2, and GitHub Actions.
                  </li>
                  <li>
                    Improved backend SEO by optimizing API performance and generating
                    dynamic XML sitemaps for active listings.
                  </li>
                </ul>
              </div>
            </section>

            <!-- Projects -->
            <section mb-7>
              <h2
                class="text-sm font-bold text-[var(--bp-blue-dim)] mb-2 uppercase tracking-widest"
              >
                Projects
              </h2>
              <hr class="border-[var(--bp-line-soft)] mb-4" />

              <!-- SRVJ -->
              <div>
                <div class="flex items-baseline gap-1.5 flex-wrap mb-2">
                  <h3 class="text-sm font-bold text-[var(--bp-blue)]">
                    SRVJ — Real-Time Collaborative Whiteboard Platform
                  </h3>
                  <a
                    href="https://srvj.elrefai.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center min-h-11 text-xs font-semibold text-[var(--bp-blue-dim)] underline hover:text-[var(--bp-blue)] transition-colors"
                    >Live</a
                  >
                </div>
                <ul
                  class="list-disc pl-5 space-y-1.5 text-sm text-[var(--bp-blue-dim)] leading-relaxed"
                >
                  <li>
                    Built real-time collaborative diagram editing using Yjs CRDTs over a
                    custom WebSocket server implementing the Yjs sync and awareness
                    protocols, enabling live cursors, presence, and seamless multiplayer
                    editing.
                  </li>
                  <li>
                    Secured WebSocket connections with PASETO v4 authentication and
                    enforced project-level role-based access control, while isolating
                    collaboration sessions into dedicated board rooms.
                  </li>
                  <li>
                    Designed a dual-snapshot persistence layer that stores both the
                    authoritative Yjs binary state for lossless recovery and a
                    denormalized JSON representation for efficient querying and API reads.
                  </li>
                  <li>
                    Architected the backend using PostgreSQL/Prisma for relational data
                    (users, projects, memberships, sharing) and MongoDB/Mongoose for
                    high-frequency diagram mutations.
                  </li>
                  <li>
                    Implemented horizontally scalable notifications using SSE with Redis
                    Pub/Sub fan-out, alongside BullMQ workers for asynchronous email and
                    notification processing.
                  </li>
                  <li>
                    Improved platform reliability and security through Zod validation,
                    Helmet, CORS, rate limiting, centralized error handling, structured
                    logging with Pino, and Prometheus metrics. Verified collaboration
                    behavior with integration tests and containerized the platform using
                    Docker Compose behind Nginx.
                  </li>
                </ul>
              </div>

              <!-- Gen-Import -->
              <div mt-6>
                <div class="flex items-baseline gap-1.5 flex-wrap mb-2">
                  <h3 class="text-sm font-bold text-[var(--bp-blue)]">
                    Gen-Import
                  </h3>
                  <a
                    href="https://github.com/elrefai99/Gen-Import"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center min-h-11 text-xs font-semibold text-[var(--bp-blue-dim)] underline hover:text-[var(--bp-blue)] transition-colors"
                    >GitHub</a
                  >
                  <a
                    href="https://www.npmjs.com/package/gen-import"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center min-h-11 text-xs font-semibold text-[var(--bp-blue-dim)] underline hover:text-[var(--bp-blue)] transition-colors"
                    >npm</a
                  >
                </div>
                <ul
                  class="list-disc pl-5 space-y-1.5 text-sm text-[var(--bp-blue-dim)] leading-relaxed"
                >
                  <li>
                    Built an open-source CLI tool that automatically generates
                    index.ts barrel exports for large TypeScript codebases,
                    reducing manual maintenance and import errors.
                  </li>
                  <li>
                    Implemented recursive directory traversal with
                    configurable exclusion rules, supporting scalable project
                    structures and clean module organization.
                  </li>
                  <li>
                    Designed the tool for developer productivity with
                    automatic export generation, file watching, and seamless
                    integration into existing Node.js/TypeScript workflows.
                  </li>
                  <li>
                    Focused on Developer Experience (DX) by providing a
                    lightweight, zero-runtime utility that integrates easily
                    into existing development workflows.
                  </li>
                </ul>
              </div>
            </section>

            <!-- Education -->
            <section mb-7>
              <h2
                class="text-sm font-bold text-[var(--bp-blue-dim)] mb-2 uppercase tracking-widest"
              >
                Education
              </h2>
              <hr class="border-[var(--bp-line-soft)] mb-4" />
              <p class="text-sm text-[var(--bp-blue-dim)] mb-1.5">
                <span class="font-bold text-[var(--bp-blue)]"
                  >Bachelor of Computer Science</span
                >
                <span class="text-[var(--bp-muted)]">
                  · Modern Academy – Maadi, Cairo, Jul 2022</span
                >
              </p>
              <ul
                class="list-disc pl-5 text-sm text-[var(--bp-blue-dim)] leading-relaxed"
              >
                <li>
                  Courses: Databases, Operating Systems, OOP, Data Structures,
                  Distributed Systems
                </li>
              </ul>
            </section>

            <!-- Technical Skills -->
            <section>
              <h2
                class="text-sm font-bold text-[var(--bp-blue-dim)] mb-2 uppercase tracking-widest"
              >
                Technical Skills
              </h2>
              <hr class="border-[var(--bp-line-soft)] mb-4" />

              <div class="space-y-1.5 text-sm text-[var(--bp-blue-dim)]">
                <p>
                  <span class="font-bold text-[var(--bp-blue)]">Languages:</span>
                  JavaScript, Python, Go Lang, C++
                </p>
                <p>
                  <span class="font-bold text-[var(--bp-blue)]">Backend:</span>
                  Node.js, Express.js, TypeScript, RESTful APIs, WebSockets, SSE
                </p>
                <p>
                  <span class="font-bold text-[var(--bp-blue)]"
                    >Databases &amp; Caching:</span
                  >
                  MongoDB, PostgreSQL, Prisma, Redis
                </p>
                <p>
                  <span class="font-bold text-[var(--bp-blue)]"
                    >Messaging &amp; Async:</span
                  >
                  BullMQ, message queues, AWS SQS, Redis pub/sub
                </p>
                <p>
                  <span class="font-bold text-[var(--bp-blue)]">Payments:</span>
                  PayMob, Amazon Payment Services, Stripe (webhooks, HMAC, idempotency)
                </p>
                <p>
                  <span class="font-bold text-[var(--bp-blue)]"
                    >Cloud &amp; DevOps:</span
                  >
                  AWS (EC2, EKS, S3, ECR, Lambda), Docker &amp; Docker Compose,
                  GitHub Actions CI/CD
                </p>
                <p>
                  <span class="font-bold text-[var(--bp-blue)]">Frontend:</span>
                  Vue.js, Vite, TailwindCSS, UnoCSS
                </p>
              </div>
            </section>
          </div>
        </div>

        <!-- Bottom Download Button -->
        <div flex justify-center mt-8 mb-4>
          <a
            href="/resume.pdf"
            download
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bp-blue)] text-[var(--bp-canvas)] font-semibold hover:opacity-80 transition-all duration-200 shadow-lg hover:scale-105"
          >
            <i class="i-carbon:download w-5 h-5" />
            Download CV
          </a>
        </div>
      </div>
    </FloorSection>
  </main>
</template>
