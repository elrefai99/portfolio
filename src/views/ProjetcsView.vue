<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects } from '../utils/projects'

const showModal = ref(false)
const selectedProject = ref<typeof projects[0] | null>(null)

function openModal(project: typeof projects[0]) {
  selectedProject.value = project
  showModal.value = true
}

// تجميع المشاريع حسب الفئة
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
  <section max-w-7xl mx-auto p-6 space-y-12>
    <div v-for="(group, category) in groupedProjects" :key="category" space-y-6>
      <h2 text-3xl font-bold text-white>{{ category }}</h2>

      <div grid grid-cols-1 md:grid-cols-3 gap-4>
        <div
          v-for="project in group"
          :key="project.id"
          bg="#202020"
          shadow-md
          rounded-lg
          p-0
          cursor-pointer
          hover:bg="#2a2a2a"
          transition
          overflow-hidden
          @click="openModal(project)"
        >
          <img :src="project.image" :alt="project.title" w-full h-48 object-cover />
          <h2 text-xl text-center font-bold p-4 text-white>{{ project.title }}</h2>
        </div>
      </div>
    </div>

    <!-- Modal -->
<ModelView v-model="showModal" max-w-5xl mx-auto p-6 space-y-12>
  <div space-y-5 prose prose-invert prose-lg max-w-none>
    
    <img
      v-if="selectedProject?.image"
      :src="selectedProject.image"
      alt="Project Image"
      w-full h-auto object-cover rounded-xl />

    <div flex flex-col md:flex-row md:items-center md:justify-between gap-4>
      <h1 text-3xl font-extrabold leading-tight text-white m-0>
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
          icon-btn w="60px" text-3xl 
          class="text-[#e8e8e8] w-[60px]" />
      </div>
    </div>

    <div text-gray-300 whitespace-pre-line leading-relaxed>
      {{ selectedProject?.description }}
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
