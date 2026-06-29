<script setup lang="ts">
import { computed } from 'vue'
import { projects } from '../utils/projects'
import { getTagIcon } from '../utils/icons'

// Top 4 live projects only
const selectedProjects = computed(() =>
  projects.filter((p: any) => p.category === 'Live').slice(0, 4)
)

const getDesc = (desc: string | string[]) =>
  Array.isArray(desc) ? desc[0] : desc

const cardClass = 'bp-card flex flex-col p-6'
const tagChipClass = 'bp-chip'
const footerLinkClass = 'bp-link'
</script>

<template>
  <div max-w-4xl mx-auto p-6 md:p-10>
    <div class="flex items-center justify-between mb-8">
      <h2 text-2xl font-bold text-black dark:text-white tracking-tight>Projects</h2>
      <router-link
        to="/projects"
        :class="footerLinkClass"
      >
        View all
        <i class="i-carbon:arrow-right w-4 h-4" />
      </router-link>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="project in selectedProjects"
        :key="project.slug"
        :class="cardClass"
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="flex items-center gap-2 min-w-0">
            <img
              v-if="project.logo"
              :src="project.logo"
              :alt="`${project.name} logo`"
              class="w-5 h-5 object-contain shrink-0"
              loading="lazy"
              decoding="async"
            />
            <h3 font-semibold text-lg text-black dark:text-gray-300 class="truncate">{{ project.name }}</h3>
          </div>
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            :title="`${project.name} live site`"
            class="shrink-0 text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-black dark:hover:text-white"
          >
            <i class="i-carbon:arrow-up-right w-5 h-5" />
          </a>
        </div>

        <!-- Description -->
        <p text-sm text-black dark:text-gray-400 leading-relaxed class="line-clamp-3">{{ getDesc(project.desc) }}</p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in project.tags.slice(0, 4)"
            :key="tag"
            :class="tagChipClass"
          >
            <i v-if="getTagIcon(tag)" :class="getTagIcon(tag)!" class="w-3.5 h-3.5 shrink-0" />
            {{ tag }}
          </span>
        </div>

        <!-- Footer link -->
        <div class="mt-auto pt-5">
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            :class="footerLinkClass"
          >
            <i class="i-solar:eye-bold w-4 h-4" />
            Visit
          </a>
          <a
            v-else-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            :class="footerLinkClass"
          >
            <i class="i-carbon:logo-github w-4 h-4" />
            Source
          </a>

        </div>
      </div>
    </div>
  </div>
</template>
