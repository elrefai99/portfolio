<script setup lang="ts">
// Shared disclosure chrome for the card-style sections on a blog post page
// (table of contents, FAQ, related posts, related case studies): a clickable
// label with a rotating chevron, and a body that collapses via `inert` +
// `max-height` rather than `v-if` — the content never leaves the DOM, so a
// section that also carries structured data (e.g. FAQPage) stays policy-safe
// no matter which way the toggle is left.
const props = withDefaults(
  defineProps<{
    heading: string;
    /** 'heading' renders an h2 (ties into aria-labelledby / anchors); 'label' renders the small uppercase eyebrow style used by the related-posts asides. */
    variant?: "heading" | "label";
    tag?: "section" | "aside" | "nav";
    headingId?: string;
    /** Only used when `tag` isn't 'section' (asides/nav use aria-label instead of aria-labelledby). */
    ariaLabel?: string;
    defaultOpen?: boolean;
    /** Generous cap so `max-height` transition never clips real content. */
    maxHeight?: string;
    contentGap?: string;
    /** Extra classes appended to the label/heading element only (e.g. `bp-mono`). */
    labelClass?: string;
  }>(),
  {
    variant: "heading",
    tag: "section",
    defaultOpen: true,
    maxHeight: "6000px",
    contentGap: "1.5rem",
  },
);

const expanded = ref(props.defaultOpen);
const contentId = useId();

const headingClass =
  props.variant === "heading"
    ? "scroll-mt-24 text-2xl font-semibold text-[var(--bp-blue)]"
    : "text-xs font-semibold uppercase tracking-wide text-[var(--bp-muted)]";
</script>

<template>
  <component
    :is="tag"
    class="bp-card p-6 md:p-8"
    :aria-labelledby="tag === 'section' && headingId ? headingId : undefined"
    :aria-label="tag !== 'section' ? ariaLabel : undefined"
  >
    <component
      :is="variant === 'heading' ? 'h2' : 'p'"
      :id="headingId"
      :class="[headingClass, labelClass]"
    >
      <button
        type="button"
        class="flex min-h-11 w-full items-center justify-between gap-2 py-1 text-left"
        @click="expanded = !expanded"
        :aria-expanded="expanded"
        :aria-controls="contentId"
      >
        <span>{{ heading }}</span>
        <i
          class="shrink-0 text-xl text-[var(--bp-blue-dim)] transition-transform duration-300"
          :class="expanded ? 'i-carbon:chevron-up' : 'i-carbon:chevron-down'"
          aria-hidden="true"
        ></i>
      </button>
    </component>
    <div
      :id="contentId"
      :inert="!expanded"
      class="overflow-hidden transition-all duration-300 ease-out"
      :style="{
        maxHeight: expanded ? maxHeight : '0px',
        marginTop: expanded ? contentGap : '0px',
      }"
    >
      <slot />
    </div>
  </component>
</template>
