<script setup lang="ts">
const timeline = [
  {
    company: "Lesoll",
    role: "Software Engineer",
    period: "2023 - Now",
    desc: "Working on lesoll large scale system",
    link: "https://lesoll.com",
    color: "bg-green-400"
  },
  {
    company: "Modern Academy (CS)",
    role: "B.S. Computer Science",
    period: "2018 - 2022",
    desc: "Completed B.Sc. in Computing Web applications.",
    color: "bg-yellow-500"
  },
  {
    company: ".md",
    role: "Founder",
    period: "2019 - 2023",
    desc: "A freelance with my friend in academy",
    color: "bg-blue-500"
  }
]
</script>

<template>
  <div max-w-xl mx-auto space-y-12 p-1 text-white flex justify-center items-start>
    <div w-full max-w-4xl p-10>
      <section>
        <h2 text-2xl font-bold mb-6 text-center>Timeline</h2>
        <div border-l border-gray-700 pl-6 relative>
          <div v-for="(item, i) in timeline" :key="i" mb-8 relative>
            <span :class="['absolute -left-3 -ml-5.5 w-5 h-5 rounded-full', item.color]"></span>
            <div>
              <h3 font-semibold>
                <template v-if="item.link">
                  <a :href="item.link" target="_blank"  class="font-bold">
                    {{ item.company }}
                  </a>
                </template>
                <template v-else font-bold>
                  {{ item.company }}
                </template>
              </h3>

              <p italic text-gray-400>{{ item.role }}</p>
              <p text-sm text-gray-300>{{ item.desc }}</p>
              <span absolute right-0 top-0 text-sm text-white>{{ item.period }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
