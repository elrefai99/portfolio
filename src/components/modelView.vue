<template>
  <div
    v-if="modelValue"
    fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70
    @click.self="closeModal"
  >
    <div relative bg="#202020" dark:bg-zinc-900 text-black dark:text-white p-6 rounded-xl w="11/12" max-w-3xl shadow-lg max-h="90vh" overflow-y-auto    >
      <button
        @click="closeModal"
        absolute pt1 top-4 right-4 text-gray-100 hover:text-red-500 text-2xl
      >
        &times;
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function closeModal() {
  emit('update:modelValue', false)
}
</script>
