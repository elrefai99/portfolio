<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsSEO } from '../utils/tags';
import { projects } from '../utils/projects';
import { useHead } from '@vueuse/head';

useHead(projectsSEO);

// Category filter
const selectedCategory = ref<string>('All')
const categories = ['All', 'Live', 'Backend', 'Package']

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }
  return projects.filter((p: any) => p.category === selectedCategory.value)
})
</script>

<template>
  <div max-w-4xl mx-auto space-y-10 min-h-screen text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-4 md:p-10>
      <section>
        <h2 text-3xl font-bold mb-6 text-left text-black dark:text-white>Projects</h2>
        
        <!-- Category Filter Tabs -->
        <div class="category-tabs" flex gap-3 mb-8 flex-wrap>
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-all duration-300',
              selectedCategory === category
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                : 'bg-gray-200/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-700/70 hover:scale-105'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div grid md:grid-cols-2 gap-4>
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="project.id" 
            class="project-card bg-white-500/10 dark:bg-black-500/10 backdrop-blur-sm border border-black/10 dark:border-white/10 p-6 rounded-3xl shadow-lg flex flex-col hover:border-black/30 dark:hover:border-white/20 justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            :style="{ animationDelay: `${(index as number) * 0.1}s` }"
          >
            <div>
              <!-- Links -->
              <div flex items-center justify-between mb-2>
                <!-- Project Name -->
                <div flex>
                  <a :href="project.github ? project.github : project.npm ? project.npm : project.link">
                    <span flex items-center gap-2>
                      <img v-if="project.logo" :src="project.logo" alt="{{ project.name }} Logo"  :class="project.class"/>
                      <h3 font-semibold text-lg text-black dark:text-white>{{ project.name }}</h3>
                    </span>
                  </a>
                </div>

                <!-- Icons -->
                <div :class="project.link && project.github || project.link && project.npm || project.npm && project.github 
                  ? 'grid grid-cols-3 gap-2' 
                  : 'flex justify-end'">
                  <a 
                    v-if="project.link" 
                    :href="project.link" 
                    target="_blank" 
                    class="i-solar:eye-bold w-6 h-6 p-2 rounded-lg bg-black dark:bg-white hover:bg-black/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition hover:scale-110"
                    title="Live Site"
                  />
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank" 
                    class="i-carbon:logo-github w-6 h-6 p-2 rounded-lg bg-black dark:bg-white hover:bg-black/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition hover:scale-110"
                    title="GitHub Repo"
                  />
                  <a 
                    v-if="project.npm" 
                    :href="project.npm" 
                    target="_blank" 
                    class="i-carbon:logo-npm w-6 h-6 p-2 rounded-lg bg-black dark:bg-white hover:bg-black/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition hover:scale-110"
                    title="Npm Package"
                  />
                </div>
              </div>
          
              <!-- Description -->
              <p text-gray-700 dark:text-gray-300 mb-4>{{ project.desc }}</p>
          
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag" 
                  class="px-2 py-1 text-xs rounded-full bg-gray-200/20 dark:bg-gray-800/50 border border-gray-300/20 dark:border-gray-600/50 backdrop-blur-sm text-black dark:text-white hover:bg-gray-300/30 dark:hover:bg-gray-700/60 transition-colors duration-200"
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

<style scoped>
.project-card {
  animation: slideUp 0.6s ease-out backwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-tabs button {
  animation: fadeIn 0.5s ease-out backwards;
}

.category-tabs button:nth-child(1) { animation-delay: 0.1s; }
.category-tabs button:nth-child(2) { animation-delay: 0.2s; }
.category-tabs button:nth-child(3) { animation-delay: 0.3s; }
.category-tabs button:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
