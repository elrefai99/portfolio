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

const heroLinkClass = 'bp-link'
const categoryChipClass = 'animate-project-tab bp-tab'
const categoryChipInactiveClass = ''
const categoryChipActiveClass = 'is-active'
const projectCardClass = 'bp-card animate-project-rise mb-4'
const actionIconClass = 'bp-icon-btn'
const tagChipClass = 'bp-chip'
</script>

<template>
  <FloorSection level="L-03" name="Project Archive" elevation="+0.00 m" :top-slab="false">
  <div max-w-4xl mx-auto space-y-10 min-h-screen text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-4 md:p-10>
      <section>
        <div class="flex flex-col items-center text-center mb-6">
          <h1 text-5xl font-bold mb-2 text-black dark:text-white>Projects</h1>
          <p text-sm text-gray-500 dark:text-gray-400 mb-4>
            Backend, API, payment, and developer tooling projects built with Node.js, TypeScript, AWS, Docker, Redis, and PostgreSQL.
          </p>
          <a
            href="https://github.com/elrefai99"
            target="_blank"
            :class="heroLinkClass"
          >
            <i class="i-carbon:logo-github w-4 h-4" />
            GitHub
          </a>
        </div>

        <!-- Category Filter Tabs -->
        <div class="category-tabs" flex gap-3 mb-8 flex-wrap>
          <button
            v-for="(category, index) in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              categoryChipClass,
              selectedCategory === category
                ? categoryChipActiveClass
                : categoryChipInactiveClass
            ]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="(project, index) in filteredProjects"
            :id="project.slug"
            :key="project.slug"
            :class="projectCardClass"
            class="scroll-mt-24"
            :style="{ animationDelay: `${(index as number) * 0.1}s` }"
          >
              <div p-6>
                <!-- Header -->
                <div flex items-center justify-between mb-4>
                  <div flex items-center gap-2 flex-1>
                    <img v-if="project.logo" :src="project.logo" :alt="project.name + ' Logo'" :class="project.class" loading="lazy" decoding="async"/>
                    <h3 font-semibold text-lg text-black dark:text-gray-300>{{ project.name }}</h3>
                  </div>
                  <div flex gap-2>
                    <a v-if="project.link" :href="project.link" target="_blank" :class="actionIconClass" title="Live Site"><i class="i-solar:eye-bold" /></a>
                    <a v-if="project.github" :href="project.github" target="_blank" :class="actionIconClass" title="GitHub Repo"><i class="i-carbon:logo-github" /></a>
                    <a v-if="project.npm" :href="project.npm" target="_blank" :class="actionIconClass" title="Npm Package"><i class="i-carbon:logo-npm" /></a>
                  </div>
                </div>

                <!-- Technologies -->
                <div>
                  <p text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide>Technologies</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in project.tags"
                      :key="tag"
                      :class="tagChipClass"
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
                <div
                  overflow-hidden transition-all duration-300 ease-out
                  :style="{ maxHeight: isDescriptionExpanded(project.id) ? '800px' : '0px' }"
                >
                  <ul v-if="Array.isArray(project.desc)" text-black dark:text-gray-400 leading-relaxed mt-3 list-disc pl-5 space-y-2>
                    <li v-for="(point, idx) in project.desc" :key="idx">{{ point }}</li>
                  </ul>
                  <p v-else text-black dark:text-gray-400 leading-relaxed mt-3>{{ project.desc }}</p>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  </FloorSection>
</template>
