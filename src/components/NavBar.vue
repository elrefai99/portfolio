<script setup lang="ts">

</script>

<template>
  <div flex="~ gap2" text-3xl items-center px8 pt8 pb2 p5 mx-7xl>
    <h1 text-3xl font-serif op50>
      <a href="/">
      <span font-bold italic>el</span>
      </a>
    </h1>
    <div flex-auto  />
    <router-link text-2xl font-serif op50 icon-btn i-carbon:shopping-bag to="/projects" />
    <router-link text-2xl font-serif op50 icon-btn i-carbon:align-box-top-center to="/resume" />

    <div md:mx-6 />
    <a hidden md:flex text-2xl font-serif op50 icon-btn i-carbon-logo-github href="https://github.com/elrefai99" target="_blank" title="GitHub" />
    <a hidden md:flex text-2xl font-serif op50 icon-btn i-carbon-logo-x href="https://x.com/elrefai99" target="_blank" title="X.com" />
    <a hidden md:flex text-2xl font-serif op50 icon-btn i-carbon-logo-linkedin href="https://www.linkedin.com/in/elrefai99/" target="_blank" title="LinkedIn" />
    <a hidden md:flex text-2xl font-serif op50 icon-btn i-carbon-logo-instagram href="https://www.instagram.com/elrefai99/" target="_blank" title="LinkedIn" />
    <a hidden md:flex text-2xl font-serif op50 icon-btn i-carbon-logo-facebook href="https://www.facebook.com/hamada.mostafa.18007" target="_blank" title="Facebook" />
    <!-- <a icon-btn i-carbon-logo- href="https://github.com/antfu/what-time" target="_blank" title="GitHub" /> -->
    <!-- <DarkMode /> -->
  </div>
</template>

