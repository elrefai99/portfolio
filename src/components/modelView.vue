<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function closeModal() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    v-if="modelValue"
    fixed inset-0 z="1000" flex items-center justify-center
    @click.self="closeModal"
  >
    <div relative bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-xl w="90%" max-w-3xl shadow-lg>
      <button
        @click="closeModal"
        absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl
      >        &times;</button>
      <slot />
    </div>
  </div>
</template>
