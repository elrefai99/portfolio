<script setup lang="ts">
</script>

<template>
  <header>
    <NavBar />
  </header>
  <BackGround />
  <RouterView />
  <Footer />
</template>

<style>
html.dark {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
