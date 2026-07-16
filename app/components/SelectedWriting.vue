<script setup lang="ts">
// Renders in the entry chunk (home page). Never import blogs.ts here — the
// corpus must stay out of the home chunk (see CLAUDE.md). These entries are
// hand-synced with shared/utils/blogs.ts: keep title text identical to the
// post's `title` so the anchor text matches the target page's h1.
//
// Purpose: a direct crawl path from the site's strongest page to posts that
// otherwise only get links from /blogs and related-post asides.
const posts = [
  {
    title: 'CRDTs & Yjs in Production: The Day I Stopped Writing Conflict-Resolution Code',
    to: '/blogs/crdts-yjs-collaborative-editing-srvj',
    category: 'Distributed Systems',
  },
  {
    title: 'PayMob Webhooks in Node.js: HMAC, Idempotency & What the Docs Don\'t Cover',
    to: '/blogs/paymob-amazon-payment-services-integration',
    category: 'Payment Integration',
  },
  {
    title: 'PASETO vs JWT in Node.js: Choosing the Right Token for the Job',
    to: '/blogs/jwt-vs-paseto-tokens',
    category: 'Backend Security',
  },
];

const cardClass = 'bp-card flex flex-col p-6';
const footerLinkClass = 'bp-link';
</script>

<template>
  <div max-w-4xl mx-auto p-6 md:p-10>
    <div class="flex items-center justify-between mb-8">
      <h2 text-2xl font-bold text-black dark:text-white tracking-tight>Writing</h2>
      <router-link to="/blogs" :class="footerLinkClass">
        View all
        <i class="i-carbon:arrow-right w-4 h-4" />
      </router-link>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <router-link v-for="post in posts" :key="post.to" :to="post.to" :class="cardClass">
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
        >
          {{ post.category }}
        </p>
        <span class="text-lg font-semibold text-black dark:text-gray-300">
          {{ post.title }}
        </span>
      </router-link>
    </div>
  </div>
</template>
