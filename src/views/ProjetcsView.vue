<!-- Projects.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import {projects} from '../utils/projects'
const showModal = ref(false)
const selectedProject = ref<{ title: string; description: string } | null>(null)


function openModal(project: { title: string; description: string }) {
  selectedProject.value = project
  showModal.value = true
}
</script>

<template>
      <header>
    <NavBar />
  </header>
  <section class="max-w-7xl mx-auto p-6 space-y-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-[#202020] shadow-md rounded-lg p-6 cursor-pointer hover:bg-[#2a2a2a] transition"
        @click="openModal(project)"
      >
        <h2 class="text-xl font-bold mb-2 text-white">{{ project.title }}</h2>
        <p class="text-gray-400">{{ project.description }}</p>
      </div>
    </div>

    <!-- Modal -->
    <ModelView v-model="showModal">
      <h2 class="text-2xl font-bold mb-4">{{ selectedProject?.title }}</h2>
      <p class="text-gray-300">{{ selectedProject?.description }}</p>
    </ModelView>
  </section>
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
