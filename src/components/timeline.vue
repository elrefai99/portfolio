<script setup lang="ts">
import lesollLogo from '../../public/projects/lesoll-logo.png'
import modernAcademyLogo from '../../public/projects/modern-academy.png'

const timeline = [
  {
    company: "Lesoll",
    role: "Software Engineer",
    period: "2023 - Present",
    logo: lesollLogo,
    desc: [
      "Built and operated the payment system integrating PayMob and Amazon Payment Services, processing ~10K transactions/month with HMAC-verified webhooks and idempotent handlers that guarantee zero double-charges.",
      "Designed event-driven background processing (BullMQ + Redis) for email/SMS/OTP and notifications, moving ~500 jobs/day of slow third-party calls off the request path with automatic retries — removing external-provider latency and failures from user-facing endpoints.",
      "Engineered a real-time chat and notifications layer (WebSockets / SSE) serving 5k concurrent users with reliable delivery.",
      "Eliminated N+1 query patterns and refactored MongoDB aggregation pipelines, reducing key endpoint response times from 680 ms to 230 ms.",
      "Built the CoHost system, cancellation policy, booking, reports, and employee tooling, plus a Puppeteer traffic-scraping pipeline used by 4k internal users.",
      "Owned containerised deployment on AWS — Lesoll via Docker + EC2, EGYStay via Docker + EKS — with GitHub Actions CI/CD and Nginx, reducing deploy time to 1 minute."
    ],
    link: "https://lesoll.com",
    color: "bg-green-400 dark:bg-green-500"
  },
  {
    company: "Modern Academy (CS)",
    role: "B.S. Computer Science",
    period: "2018 - 2022",
    logo: modernAcademyLogo,
    desc: "Completed B.Sc. in Computing Web applications.",
    color: "bg-yellow-500 dark:bg-yellow-400"
  },
  {
    company: ".md",
    role: "Founder",
    period: "2019 - Present",
    desc: "A freelance with my friend in academy",
    color: "bg-blue-500 dark:bg-blue-400"
  }
]
</script>

<template>
  <div 
    max-w-3xl mx-auto space-y-15 p1
    text-black dark:text-white
    flex justify-center items-start
  >
    <div w-full p="4 md:10">
      <section class="animate-fade-in">
        <h2 
        text-2xl font-bold mb-8
        text-black dark:text-white
        tracking-tight
        >
          Timeline
        </h2>
        
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, i) in timeline"
            :key="i"
            class="timeline-item group relative flex gap-4"
          >
            <!-- Dot -->
            <div class="flex flex-col items-center">
              <span :class="['w-4 h-4 rounded-full mt-1 shrink-0 transition-all duration-300 group-hover:scale-125', item.color]">
                <span :class="['absolute inset-0 w-4 h-4 rounded-full pulse-animation opacity-75', item.color]"></span>
              </span>
              <div v-if="i < timeline.length - 1" class="w-px flex-1 bg-gray-300 dark:bg-gray-600 mt-2"></div>
            </div>

            <!-- Box card -->
            <div
              class="timeline-content flex-1 mb-4 p-4 rounded-xl backdrop-blur-sm bg-white/10 dark:bg-white/8 border border-black/10 dark:border-white/14 shadow-md transition-all duration-300 group-hover:shadow-xl"
            >
              <div class="flex flex-wrap items-start justify-between gap-1 mb-1">
                <h3 font-bold text-black dark:text-white class="flex items-center gap-2">
                  <img v-if="item.logo" :src="item.logo" :alt="`${item.company} logo`" class="w-6 h-6 rounded-md object-contain shrink-0" />
                  <a v-if="item.link" :href="item.link" target="_blank" class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">{{ item.company }}</a>
                  <span v-else>{{ item.company }}</span>
                </h3>
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ item.period }}</span>
              </div>

              <p italic text-sm text-gray-600 dark:text-gray-400 mb-2>{{ item.role }}</p>

              <ul v-if="Array.isArray(item.desc)" class="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <li v-for="(point, idx) in item.desc" :key="idx">{{ point }}</li>
              </ul>
              <p v-else class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
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

.timeline-item {
  animation: slideInLeft 0.6s ease-out backwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-item:hover .timeline-content {
  transform: translateX(8px);
}

.pulse-animation {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
