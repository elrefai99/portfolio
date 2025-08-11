<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '../utils/projects'

const showModal = ref(false)
const selectedProject = ref<typeof projects[0] | null>(null)

function openModal(project: typeof projects[0]) {
  selectedProject.value = project
  showModal.value = true
}

const groupedProjects = computed(() => {
  const groups: Record<string, typeof projects> = {}
  projects.forEach((project) => {
    if (!groups[project?.category]) {
      groups[project?.category] = []
    }
    groups[project?.category].push(project)
  })
  return groups
})
</script>

<template>
  <NavBar />

  <section max-w-6xl mx-auto p-6 space-y-12>
    <div v-for="(group, category) in groupedProjects" :key="category" space-y-6>
      <h2 class="text-3xl font-bold text-white text-center border-b border-gray-600 pb-2 mb-4">{{ category }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="project in group"
          :key="project.id"
          class="bg-[#202020] hover:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
          @click="openModal(project)"
        >
          <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover rounded-t-xl" />
          <div class="p-4">
            <h2 class="text-xl text-white font-bold text-center">{{ project.title }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModelView v-model="showModal">
      <div class="space-y-6 prose prose-invert prose-lg max-w-none modal-content">
        <img
          v-if="selectedProject?.image"
          :src="selectedProject.image"
          alt="Project Image"
          class="w-full h-auto object-cover rounded-xl"
        />

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-3xl font-extrabold leading-tight text-white m-0">
            {{ selectedProject?.title }}
          </h1>


      <div flex gap-4 mt-2 md:mt-0>
        <a
          v-if="selectedProject?.github"
          :href="selectedProject.github"
          target="_blank"
          rel="noopener noreferrer"
          i-carbon-logo-github  text-3xl 
          class="text-[#e8e8e8] w-[60px]" />
        <a
          i-solar:eye-bold 
          v-if="selectedProject?.site"
          :href="selectedProject.site"
          target="_blank"
          rel="noopener noreferrer"
           w="60px" text-3xl 
          class="text-[#e8e8e8] w-[60px]" />
      </div>
    </div>

<div v-if="selectedProject?.sections" class="space-y-6">
  <div
    v-for="section in selectedProject.sections"
    :key="section.title"
    class="mb-6"
  >
    <h3 class="text-xl font-bold text-white mb-2">{{ section.title }}</h3>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li v-for="point in section.points" :key="point">{{ point }}</li>
    </ul>
  </div>
</div>

<!-- fallback if project still uses plain description -->
<div v-else>
  <ul class="list-disc list-inside space-y-2 text-gray-300">
    <li
      v-for="line in selectedProject?.description?.split('\\n').filter(l => l.trim())"
      :key="line"
    >
      {{ line.trim() }}
    </li>
  </ul>
</div>
        <div
          v-if="selectedProject?.tech"
          class="border-t border-gray-700 pt-4 text-sm text-gray-400"
        >
          Technologies: {{ selectedProject.tech }}
        </div>
      </div>
    </ModelView>
  </section>
</template>

<style scoped>
section {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content {
  animation: scaleFadeIn 0.3s ease-in-out;
}
</style>
