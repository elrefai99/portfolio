<script setup lang="ts">
</script>

<template>
  <NavBar />
  <BackGround />
  <RouterView />
  <Footer />
</template>
<style>
html.dark {
  background: #000001;
  color: var(--color-text);
  color-scheme: dark;
}
</style>
