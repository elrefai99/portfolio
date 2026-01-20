<script setup lang="ts">
const timeline = [
  {
    company: "Lesoll",
    role: "Software Engineer",
    period: "2023 - Now",
    desc: [
            "Developed a B2C and B2B marketplace for real estate and automotive",
      "Developed key features: Payment system (use paymob as payment gateway), admin dashboard, user dashboard, chat system, notifications system, emails system, sms system (OTP system), traffic system (use puppeteer to scrape websites),reports and employee tools",
      "Deployed and managed a service using Docker and AWS EC2"
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
    period: "2019 - 2023",
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
        
        <div 
          border="l-2 gray-300 dark:gray-600" 
          pl-6 relative
        >
          <div 
            v-for="(item, i) in timeline" 
            :key="i" 
            mb-8 relative
            class="timeline-item group"
          >
            <!-- Colored dots with pulse -->
            <span 
              :class="['absolute -left-3 -ml-5.5 w-5 h-5 rounded-full transition-all duration-300 group-hover:scale-125', item.color]"
            >
              <span 
                :class="['absolute inset-0 rounded-full pulse-animation opacity-75', item.color]"
              ></span>
            </span>

            <div 
              class="timeline-content"
              transition-transform duration-300
            >
              <!-- Company name -->
              <h3 font-semibold pr="0 md:24">
                <template v-if="item.link">
                  <a 
                    :href="item.link" 
                    target="_blank" 
                    font-bold
                    text-black dark:text-white
                    transition-colors duration-200
                    hover="text-gray-600 dark:text-gray-300"
                  >
                    {{ item.company }}
                  </a>
                </template>
                <div v-else font-bold text-black dark:text-white>
                  {{ item.company }}
                </div>
              </h3>

              <!-- Period -->
              <span 
                block md:absolute md:right-0 md:top-0
                text-sm font-medium
                text="gray-500 dark:gray-400 md:black md:dark:white"
                mb="1 md:0"
              >
                {{ item.period }}
              </span>

              <!-- Role -->
              <p italic text-gray-600 dark:text-gray-400 mt-1>
                {{ item.role }}
              </p>

              <!-- Description -->
              <div 
                class="description-content"
              >
                <!-- If description is an array, show as bullet points -->
                <ul 
                  v-if="Array.isArray(item.desc)"
                  text-gray-700 dark:text-gray-300 leading-relaxed mt-3
                  list-disc pl-5 space-y-2
                >
                  <li v-for="(point, idx) in item.desc" :key="idx">
                    {{ point }}
                  </li>
                </ul>
                
                <!-- If description is a string, show as paragraph -->
                <p 
                  v-else
                  text-gray-700 dark:text-gray-300 leading-relaxed mt-3
                >
                  {{ item.desc }}
                </p>
              </div>
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
