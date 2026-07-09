<script setup lang="ts">
import { homeSEO } from '../utils/seo/home';
import { useHead } from '@vueuse/head';

useHead(homeSEO)

</script>

<template>
  <main>
    <FloorSection level="L-00" name="Hero / Introduction" elevation="+0.00 m" :top-slab="false" eager>
      <Aboutme />
    </FloorSection>
    <FloorSection level="L-01" name="Selected Works" elevation="+8.00 m" slab="RC SLAB · 300mm">
      <SelectedProjects />
    </FloorSection>
    <FloorSection level="L-02" name="Experience / Timeline" elevation="+16.00 m" slab="RC SLAB · 300mm">
      <Timeline />
    </FloorSection>
  </main>
</template>