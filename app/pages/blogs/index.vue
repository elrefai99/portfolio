<script setup lang="ts">
import { createBlogsIndexSEO } from "~~/shared/utils/seo/blog";

useHead(createBlogsIndexSEO(1));
</script>

<template>
  <main>
    <FloorSection
      level="L-04"
      name="Journal / Field Notes"
      elevation="+0.00 m"
      :top-slab="false"
      eager
    >
      <div
        max-w-4xl
        mx-auto
        space-y-10
        min-h-screen
        flex
        justify-center
        items-start
      >
        <div w-full max-w-4xl p-4 md:p-10>
          <BlogsArchive :page="1" />
        </div>
      </div>
    </FloorSection>
  </main>
</template>
