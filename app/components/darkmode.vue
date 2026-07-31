<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark({ storageKey: "theme-mode" });
const toggleDark = useToggle(isDark);

const button = ref<HTMLButtonElement | null>(null);

let seq = 0;

function onToggle(event: MouseEvent) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => Promise<void> | void) => {
      finished: Promise<void>;
    };
  };

  if (
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    toggleDark();
    return;
  }

  const rect = button.value?.getBoundingClientRect();
  const x = event.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
  const y = event.clientY || (rect ? rect.top + rect.height / 2 : 0);

  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const collapse = !isDark.value;
  const covering = `circle(${radius}px at ${x}px ${y}px)`;
  const pinpoint = `circle(0px at ${x}px ${y}px)`;
  const moving = collapse ? "old" : "new";
  const resting = collapse ? "new" : "old";
  const from = collapse ? covering : pinpoint;
  const to = collapse ? pinpoint : covering;

  const name = `bp-vt-${(seq += 1)}`;
  const style = document.createElement("style");
  style.textContent = `
@keyframes ${name} { from { clip-path: ${from} } to { clip-path: ${to} } }
html::view-transition-${resting}(root) { z-index: 0 }
html::view-transition-${moving}(root) {
  z-index: 1;
  clip-path: ${from};
  animation: ${name} 520ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}`;
  document.head.append(style);

  const transition = doc.startViewTransition(async () => {
    toggleDark();
    await nextTick();
  });

  const clean = () => style.remove();
  transition.finished.then(clean, clean);
}
</script>

<template>
  <button
    ref="button"
    type="button"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    class="grid place-items-center -m-2 p-2 min-w-11 min-h-11"
    @click="onToggle"
  >
    <span i-carbon-sun dark:i-carbon-moon class="text-xl" aria-hidden="true" />
  </button>
</template>
