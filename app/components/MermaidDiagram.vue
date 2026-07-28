<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  code: string;
  filename?: string;
}>();

// Stays empty during SSG so crawlers and no-JS clients get the <pre> source
// fallback; the diagram is rendered client-side only.
const svg = ref("");

// High-contrast, warm-neutral palettes. Mermaid's stock dark/neutral themes
// render signal + label text too dim against the translucent shell, so we drive
// every text/line variable explicitly for both schemes.
const darkThemeVariables = {
  background: "transparent",
  primaryColor: "#2a2824",
  primaryBorderColor: "#6f6a5c",
  primaryTextColor: "#ece7db",
  secondaryColor: "#35322b",
  tertiaryColor: "#35322b",
  lineColor: "#b4ad9c",
  textColor: "#ece7db",
  actorBkg: "#2a2824",
  actorBorder: "#6f6a5c",
  actorTextColor: "#ece7db",
  actorLineColor: "#b4ad9c",
  signalColor: "#b4ad9c",
  signalTextColor: "#ece7db",
  labelBoxBkgColor: "#2a2824",
  labelBoxBorderColor: "#6f6a5c",
  labelTextColor: "#ece7db",
  loopTextColor: "#ece7db",
  noteBkgColor: "#3b372f",
  noteTextColor: "#ece7db",
  noteBorderColor: "#6f6a5c",
  activationBkgColor: "#3b372f",
  activationBorderColor: "#6f6a5c",
  sequenceNumberColor: "#1a1815",
} as const;

const lightThemeVariables = {
  background: "transparent",
  primaryColor: "#d1cfc8",
  primaryBorderColor: "#5d544f",
  primaryTextColor: "#362f2a",
  secondaryColor: "#d1cfc8",
  tertiaryColor: "#d1cfc8",
  lineColor: "#4a423c",
  textColor: "#362f2a",
  actorBkg: "#d1cfc8",
  actorBorder: "#5d544f",
  actorTextColor: "#362f2a",
  actorLineColor: "#4a423c",
  signalColor: "#4a423c",
  signalTextColor: "#362f2a",
  labelBoxBkgColor: "#d1cfc8",
  labelBoxBorderColor: "#5d544f",
  labelTextColor: "#362f2a",
  loopTextColor: "#362f2a",
  noteBkgColor: "#d1cfc8",
  noteTextColor: "#362f2a",
  noteBorderColor: "#5d544f",
  activationBkgColor: "#d1cfc8",
  activationBorderColor: "#5d544f",
  sequenceNumberColor: "#e5e4e0",
} as const;

type MermaidModule = typeof import("mermaid")["default"];
let mermaidMod: MermaidModule | null = null;
let observer: MutationObserver | null = null;
let viewportObserver: IntersectionObserver | null = null;
let lastDark: boolean | null = null;
const root = ref<HTMLElement | null>(null);

const renderDiagram = async () => {
  try {
    if (!mermaidMod) {
      mermaidMod = (await import("mermaid")).default;
    }
    const isDark = document.documentElement.classList.contains("dark");
    lastDark = isDark;
    mermaidMod.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: isDark ? darkThemeVariables : lightThemeVariables,
    });
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    const { svg: rendered } = await mermaidMod.render(id, props.code);
    svg.value = rendered;
  } catch (error) {
    console.error("Mermaid render failed:", error);
  }
};

// Re-render on the dark/light toggle so a diagram is never left low-contrast.
const watchThemeToggle = () => {
  if (observer) return;
  observer = new MutationObserver(() => {
    if (document.documentElement.classList.contains("dark") !== lastDark) {
      renderDiagram();
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
};

onMounted(() => {
  // Defer loading the (~600 KB) mermaid bundle until the diagram is near the
  // viewport. Keeps it off the critical path so it never delays LCP/TBT on
  // article and case-study pages that render diagrams below the fold.
  const el = root.value;
  if (!el || typeof IntersectionObserver === "undefined") {
    renderDiagram().then(watchThemeToggle);
    return;
  }
  viewportObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        viewportObserver?.disconnect();
        viewportObserver = null;
        renderDiagram().then(watchThemeToggle);
      }
    },
    { rootMargin: "400px 0px" }
  );
  viewportObserver.observe(el);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  viewportObserver?.disconnect();
});
</script>

<template>
  <div
    ref="root"
    class="overflow-hidden rounded-xl border border-[var(--bp-line-soft)] bg-[#f4f3ef]/80 shadow-[0_18px_48px_rgba(74,66,60,0.18)] dark:bg-[rgba(var(--bp-accent-rgb),0.08)] dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]"
  >
    <div
      class="flex items-center justify-between gap-4 border-b border-[var(--bp-line-soft)] px-4 py-3 text-xs text-[var(--bp-blue-dim)]"
    >
      <span class="font-mono">{{ filename || "diagram" }}</span>
      <span class="rounded-full bg-[rgba(var(--bp-accent-rgb),0.05)] px-2 py-1 font-mono uppercase dark:bg-[rgba(var(--bp-accent-rgb),0.1)]"
        >mermaid</span
      >
    </div>
    <!-- min-height reserves space so the client-side <pre> → <svg> swap doesn't shift the page (CLS) -->
    <div class="mermaid-body flex min-h-64 items-center justify-center">
      <div v-if="svg" class="mermaid-diagram w-full overflow-x-auto p-4" v-html="svg" />
      <pre
        v-else
        class="w-full overflow-x-auto p-4 text-sm leading-7 text-[var(--bp-blue-dim)]"
      ><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
