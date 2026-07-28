<script setup lang="ts">
import type { BlogBlock } from "~~/shared/utils/blogs";
import { tableOfContents } from "~~/shared/utils/headingIds";

const props = withDefaults(
  defineProps<{
    blocks: BlogBlock[];
    /** Below this many headings a contents list is noise, not navigation. */
    minEntries?: number;
  }>(),
  { minEntries: 3 },
);

const entries = computed(() => tableOfContents(props.blocks));
const show = computed(() => entries.value.length >= props.minEntries);

// Scrollspy. Deliberately IntersectionObserver and not a scroll listener: these
// articles run to 124KB of HTML, and a handler firing on every scroll frame
// over a document that size is exactly how you turn a good INP into a bad one.
const activeId = ref("");
let observer: IntersectionObserver | null = null;

const startObserving = () => {
  observer?.disconnect();
  if (!show.value) return;

  const headings = entries.value
    .map((entry) => document.getElementById(entry.id))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!headings.length) return;

  observer = new IntersectionObserver(
    (records) => {
      // A narrow band near the top of the viewport decides "current section":
      // whichever tracked heading sits in it wins, falling back to the last one
      // scrolled past so the highlight never blanks out mid-section.
      const visible = records
        .filter((record) => record.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) activeId.value = visible[0].target.id;
    },
    { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
  );

  for (const heading of headings) observer.observe(heading);
};

onMounted(startObserving);
onBeforeUnmount(() => observer?.disconnect());
// Client-side route changes swap the article without remounting the component.
watch(() => props.blocks, () => nextTick(startObserving));
</script>

<template>
  <nav
    v-if="show"
    class="bp-card p-6 md:p-8"
    aria-label="Table of contents"
  >
    <p
      class="bp-mono text-xs font-semibold uppercase tracking-wide text-[var(--bp-muted)]"
    >
      On this page
    </p>
    <ol class="mt-4 space-y-2">
      <li
        v-for="entry in entries"
        :key="entry.id"
        :class="entry.level === 3 ? 'ml-4' : ''"
      >
        <a
          :href="`#${entry.id}`"
          class="toc-link block text-sm leading-6"
          :class="{ 'is-active': activeId === entry.id }"
          :aria-current="activeId === entry.id ? 'true' : undefined"
        >
          {{ entry.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.toc-link {
  color: inherit;
  opacity: 0.7;
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.toc-link:hover,
.toc-link:focus-visible {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.toc-link.is-active {
  opacity: 1;
  font-weight: 600;
  color: var(--bp-blue);
}
</style>
