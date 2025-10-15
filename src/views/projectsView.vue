<script setup lang="ts">
import { projectsSEO } from '../utils/tags';
import { projects } from '../utils/projects';
import { useHead } from '@vueuse/head';

useHead(projectsSEO);
</script>

<template>
  <div max-w-4xl mx-auto space-y-10 min-h-screen text-black dark:text-white flex justify-center items-start>
    <div w-full max-w-4xl p-10>
      <section>
        <h2 text-3xl font-bold mb-6 text-left text-black dark:text-white >Projects</h2>
        <div grid md:grid-cols-2 gap-4>
          <div v-for="(project) in projects" :key="project.id" class="bg-white-500/10 dark:bg-black-500/10 backdrop-blur-md border border-black/10 dark:border-white/10 dark:border-black/10 p-6 rounded-3xl shadow-lg flex flex-col hover:border-white/20 justify-between">
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
                    class="i-solar:eye-bold w-6 h-6 p-2 rounded-lg bg-white dark:bg-gray-200/50 hover:bg-white/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition"
                    title="Live Site"
                  />
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank" 
                    class="i-carbon:logo-github w-6 h-6 p-2 rounded-lg bg-white dark:bg-gray-200/50 hover:bg-white/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition"
                    title="GitHub Repo"
                  />
                  <a 
                    v-if="project.npm" 
                    :href="project.npm" 
                    target="_blank" 
                    class="i-carbon:logo-npm w-6 h-6 p-2 rounded-lg bg-white dark:bg-gray-200/50 hover:bg-white/50 dark:hover:bg-gray-300/50 backdrop-blur-sm transition"
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
                  class="px-2 py-1 text-xs rounded-full bg-gray-200/20 dark:bg-gray-800/50 border border-gray-300/20 dark:border-gray-600/50 backdrop-blur-sm text-black dark:text-white"
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
