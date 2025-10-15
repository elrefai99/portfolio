<script setup lang="ts">
const timeline = [
  {
    company: "Lesoll",
    role: "Software Engineer",
    period: "2023 - Now",
    desc: "Working on lesoll large scale system",
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
  <div max-w-xl mx-auto space-y-12 p-1 text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-10>
      <section>
        <h2 text-2xl font-bold mb-6 text-center text-black dark:text-white>Timeline</h2>
        <div border-l border-gray-300 dark:border-gray-600 pl-6 relative>
          <div v-for="(item, i) in timeline" :key="i" mb-8 relative>
            <!-- النقاط الملونة -->
            <span :class="['absolute -left-3 -ml-5.5 w-5 h-5 rounded-full', item.color]"></span>

            <div>
              <!-- اسم الشركة -->
              <h3 font-semibold>
                <template v-if="item.link">
                  <a :href="item.link" target="_blank" 
                     class="font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                    {{ item.company }}
                  </a>
                </template>
                <div v-else class="font-bold text-black dark:text-white">
                  {{ item.company }}
                </div>
              </h3>

              <!-- الدور الوظيفي -->
              <p italic text-gray-600 dark:text-gray-400>{{ item.role }}</p>

              <!-- الوصف -->
              <p text-sm text-gray-700 dark:text-gray-300>{{ item.desc }}</p>

              <!-- الفترة الزمنية -->
              <span absolute right-0 top-0 text-sm text-black dark:text-white>{{ item.period }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
section {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
