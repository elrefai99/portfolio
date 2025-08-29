<script setup lang="ts">
import { projects } from '../utils/projects'
</script>

<template>
    <div max-w-3xl mx-auto space-y-12 min-h-screen text-white flex justify-center items-start>
        <div w-full max-w-4xl p-10>
            <section>
                <h2 class="" text-2xl font-bold mb-6 text-center>Projects</h2>
                <div class="" grid md:grid-cols-2 gap-6>
                  <div 
                    v-for="(project, i) in projects" 
                    :key="project.id" 
                    class="bg-black-500/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg flex flex-col hover:border-white/15 justify-between"
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
                          <a 
                            v-if="project.npm" 
                            :href="project.npm" 
                            target="_blank" 
                            class="i-carbon:logo-npm w-6 h-6 p-2 rounded-lg bg-white-100 hover:bg-white-500/50 backdrop-blur-sm transition"
                            title="Npm Package"
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