<script setup lang="ts">
import { computed } from "vue";
import { blogsPageCount } from "~~/shared/utils/blogs";
import { createBlogsIndexSEO } from "~~/shared/utils/seo/blog";

const route = useRoute();

const page = computed(() => Number(route.params.page));

// Page 1 canonically lives at /blogs, not /blogs/page/1 — no second URL for
// the same content. Non-numeric, non-integer, or out-of-range page numbers
// are a genuine 404 (unlisted routes are never prerendered), matching every
// other dynamic route on this site.
const isValidPage = computed(
  () =>
    Number.isInteger(page.value) &&
    page.value >= 2 &&
    page.value <= blogsPageCount,
);

if (!isValidPage.value) {
  throw createError({ statusCode: 404, statusMessage: "Not Found", fatal: true });
}

useHead(computed(() => createBlogsIndexSEO(page.value)));
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
          <BlogsArchive :page="page" />
        </div>
      </div>
    </FloorSection>
  </main>
</template>
