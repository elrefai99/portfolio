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

      <!-- Projects -->
      <section>
            <h2 class="text-2xl font-bold mt-16 mb-6 text-center">Projects</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div 
        v-for="(project, i) in projects" 
        :key="project.id" 
        class="bg-black-500/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg flex flex-col justify-between"
      >
        <div>
          <!-- Links -->
          <div class="flex items-center justify-between mb-2">
            <!-- Project Name -->
            <h3 class="font-semibold text-lg">{{ project.name }}</h3>
        
            <!-- Icons -->
            <div class="flex gap-2">
              <a 
                v-if="project.link" 
                :href="project.link" 
                target="_blank" 
                class="i-solar:eye-bold w-6 h-6 p-2 rounded-lg bg-white-100 hover:bg-white-500/50 backdrop-blur-sm transition"
                title="Live Site"
              />
              <a 
                v-if="project.github" 
                :href="project.github" 
                target="_blank" 
                class="i-carbon:logo-github w-6 h-6 p-2 rounded-lg bg-white-100 hover:bg-white-500/50 backdrop-blur-sm transition"
                title="GitHub Repo"
              />
            </div>
          </div>

          <p class="text-sm text-gray-400 mb-2">{{ project.category }}</p>
          <p class="text-gray-300 mb-4">{{ project.desc }}</p>

          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tag in project.tags" 
              :key="tag" 
              class="px-2 py-1 text-xs rounded-full bg-gray-800/50 border border-gray-600/50 backdrop-blur-sm"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>
  </div>

</template>
