<script setup lang="ts">
const timeline = [
  {
    company: "Lesoll",
    role: "Software Engineer",
    period: "2023 - Present",
    desc: [
      "At Lesoll, I led the backend development of a real estate marketing platform.",
      "Involved in building scalable B2C and B2B marketplace platforms for real estate and automotive domains.",
      "Developed key features: Payment system (use paymob as payment gateway), admin dashboard, user dashboard, chat system, notifications system, emails system, sms system (OTP system), traffic system (use puppeteer to scrape websites),reports and employee tools",
      "Managed a service using Docker and AWS EC2"
    ],
    link: "https://lesoll.com",
    color: "bg-green-400 dark:bg-green-500"
  },
  {
    company: "Modern Academy (CS)",
    role: "B.S. Computer Science",
    period: "2018 - 2022",
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
    max-w-xl mx-auto space-y-12 p-1
    text-black dark:text-white
    flex justify-center items-start
  >
    <div w-full p="4 md:10">
      <section class="animate-fade-in">
        <h2 
          text-2xl font-bold mb-6 text-center
          text-black dark:text-white
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
                <h3 font-bold text-black dark:text-white>
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
