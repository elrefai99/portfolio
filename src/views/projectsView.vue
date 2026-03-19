<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsSEO } from '../utils/tags';
import { projects } from '../utils/projects';
import { useHead } from '@vueuse/head';
import { getTagIcon } from '../utils/icons';

useHead(projectsSEO);

// Category filter
const selectedCategory = ref<string>('All')
const categories = ['All', 'Live', 'Backend', 'Package']

// Track which project descriptions are expanded
const expandedDescriptions = ref<Set<number>>(new Set())

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }
  return projects.filter((p: any) => p.category === selectedCategory.value)
})

const toggleDescription = (id: number) => {
  if (expandedDescriptions.value.has(id)) {
    expandedDescriptions.value.delete(id)
  } else {
    expandedDescriptions.value.add(id)
  }
}

const isDescriptionExpanded = (id: number) => expandedDescriptions.value.has(id)
</script>

<template>
  <div max-w-4xl mx-auto space-y-10 min-h-screen text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-4 md:p-10>
      <section>
        <div class="flex flex-col items-center text-center mb-6">
          <h1 text-5xl font-bold mb-2 text-black dark:text-white>Projects</h1>
          <p text-sm text-gray-500 dark:text-gray-400 mb-4>Projects that I created or maintaining.</p>
          <a
            href="https://github.com/elrefai99"
            target="_blank"
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-black dark:text-white text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
          >
            <i class="i-carbon:logo-github w-4 h-4" />
            GitHub
          </a>
        </div>

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

        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="project-card bg-white-500/10 dark:bg-black-500/10 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden"
            :style="{ animationDelay: `${(index as number) * 0.1}s` }"
          >
              <div p-6>
                <!-- Header -->
                <div flex items-center justify-between mb-4>
                  <div flex items-center gap-2 flex-1>
                    <img v-if="project.logo" :src="project.logo" :alt="project.name + ' Logo'" :class="project.class"/>
                    <h3 font-semibold text-lg text-black dark:text-white>{{ project.name }}</h3>
                  </div>
                  <div flex gap-2>
                    <a v-if="project.link" :href="project.link" target="_blank" class="i-solar:eye-bold w-6 h-6 p-1.5 rounded-lg bg-black dark:bg-white hover:bg-black/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition hover:scale-110" title="Live Site" />
                    <a v-if="project.github" :href="project.github" target="_blank" class="i-carbon:logo-github w-6 h-6 p-1.5 rounded-lg bg-black dark:bg-white hover:bg-black/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition hover:scale-110" title="GitHub Repo" />
                    <a v-if="project.npm" :href="project.npm" target="_blank" class="i-carbon:logo-npm w-6 h-6 p-1.5 rounded-lg bg-black dark:bg-white hover:bg-black/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition hover:scale-110" title="Npm Package" />
                  </div>
                </div>

                <!-- Technologies -->
                <div>
                  <p text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide>Technologies</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in project.tags"
                      :key="tag"
                      class="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-200/20 dark:bg-gray-800/50 border border-gray-300/20 dark:border-gray-600/50 backdrop-blur-sm text-black dark:text-white hover:bg-gray-300/30 dark:hover:bg-gray-700/60 transition-colors duration-200"
                    >
                      <i v-if="getTagIcon(tag)" :class="getTagIcon(tag)!" class="w-3.5 h-3.5 shrink-0" />
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Description Toggle -->
                <button @click="toggleDescription(project.id)" flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-200 hover="text-black dark:text-white" mt-4>
                  <i class="transition-transform duration-300" :class="isDescriptionExpanded(project.id) ? 'i-carbon:chevron-up' : 'i-carbon:chevron-down'"></i>
                  <span>{{ isDescriptionExpanded(project.id) ? 'Hide' : 'Show' }} Description</span>
                </button>

                <!-- Description (Expandable) -->
                <div class="description-content" :class="isDescriptionExpanded(project.id) ? 'expanded' : ''">
                  <ul v-if="Array.isArray(project.desc)" text-gray-700 dark:text-gray-300 leading-relaxed mt-3 list-disc pl-5 space-y-2>
                    <li v-for="(point, idx) in project.desc" :key="idx">{{ point }}</li>
                  </ul>
                  <p v-else text-gray-700 dark:text-gray-300 leading-relaxed mt-3>{{ project.desc }}</p>
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

/* Description Content */
.description-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.description-content.expanded {
  max-height: 800px;
  transition: max-height 0.4s ease-in;
}
</style>
