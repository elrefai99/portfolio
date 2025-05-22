<template>
  <div>
    <button @click="openModal">جرب الموقع</button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <button text-black  i-carbon:close @click="closeModal" />
        <div>
                  <!-- <iframe
          :src="url"
          width="100%"
          height="500"
          frameborder="0"
        ></iframe> -->

        <div text-black>
          haha
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  url: String
})

const showModal = ref(false)

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

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
