<script setup lang="ts">
import { projects } from '../utils/projects'

const timeline = [
  {
    company: "Lesoll",
    role: "Software Development Engineer",
    period: "2023 - Now",
    desc: "working on large scale lesoll systems",
    color: "bg-blue-500"
  },
  {
    company: "Modern Academy Computer Science",
    role: "B.S. Computer Science",
    period: "2018 - 2022",
    desc: "got my degree to make my parents proud",
    color: "bg-yellow-500"
  },
  {
    company: ".md",
    role: "Founder",
    period: "2019 - 2023",
    desc: "built reselling community and developed tools",
    color: "bg-red-500"
  }
]

</script>

<template>
  <div class="max-w-2xl mx-auto space-y-12 p-10 min-h-screen text-white flex justify-center items-start">
    <div class="w-full max-w-4xl p-10">
      <!-- Timeline -->
      <section>
        <h2 class="text-2xl font-bold mb-6 text-center">Timeline</h2>
        <div class="border-l border-gray-700 pl-6 relative">
          <div v-for="(item, i) in timeline" :key="i" class="mb-8 relative">
            <!-- Dot -->
            <span :class="['absolute -left-3 -ml6 w-5 h-5 rounded-full', item.color]"></span>
            <!-- Content -->
            <div>
              <h3 class="font-semibold">{{ item.company }}</h3>
              <p class="italic text-gray-400">{{ item.role }}</p>
              <p class="text-sm text-gray-300">{{ item.desc }}</p>
              <span class="absolute right-0 top-0 text-sm text-gray-500">{{ item.period }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
