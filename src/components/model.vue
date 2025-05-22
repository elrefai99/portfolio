<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function closeModal() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div v-if="modelValue" class="modal">
    <div class="modal-content">
      <slot />
      <button @click="closeModal">إغلاق</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 1rem;
  width: 90%;
  max-width: 1000px;
  border-radius: 8px;
}
</style>
