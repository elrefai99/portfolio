<script setup lang="ts">
import { packages } from '../utils/pacakges'
import { ref, computed } from 'vue'

const showModal = ref(false)
const selectedPackage = ref<typeof packages[0] | null>(null)

function openModal(pkg: typeof packages[0]) {
  selectedPackage.value = pkg
  showModal.value = true
}

const groupedPackages = computed(() => {
  const groups: Record<string, typeof packages> = {}
  packages.forEach((pkg) => {
    if (!groups[pkg?.category]) {
      groups[pkg?.category] = []
    }
    groups[pkg?.category].push(pkg)
  })
  return groups
})
</script>

<template>
  <NavBar />

  <section max-w-6xl mx-auto p-6 space-y-12>
    <div v-for="(group, category) in groupedPackages" :key="category" space-y-6>
      <h2 class="text-3xl font-bold text-white text-center border-b border-gray-600 pb-2 mb-4">
        {{ category }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="pkg in group"
          :key="pkg.id"
          class="bg-[#202020] hover:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-lg p-6 flex flex-col justify-between"
        >
          <div>
            <h2 class="text-xl text-white font-bold text-center">{{ pkg.title }}</h2>
            <p class="text-gray-400 text-sm mt-2 text-center">
              {{ pkg.description }}
            </p>
          </div>

          <div class="flex justify-center gap-6 mt-4">
            <a
              v-if="pkg.github"
              :href="pkg.github"
              target="_blank"
              rel="noopener noreferrer"
              i-carbon-logo-github
              class="text-[#e8e8e8] text-3xl"
            />
            <a
              v-if="pkg.npm"
              :href="pkg.npm"
              target="_blank"
              rel="noopener noreferrer"
              i-logos-npm-icon
              class="text-[#e8e8e8] text-3xl"
            />
          </div>
        </div>
      </div>
    </div>
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
</style>
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
