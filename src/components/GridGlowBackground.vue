<template>
  <div class="grid-glow-background" aria-hidden="true">
    <div class="glow glow-one"></div>
    <div class="glow glow-two"></div>
    <div class="glow glow-three"></div>
    <div class="glow glow-four"></div>
    <div class="glow glow-five"></div>
  </div>
</template>

<style scoped>
.grid-glow-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.96), transparent 26%),
    radial-gradient(circle at bottom right, rgba(226, 232, 240, 0.75), transparent 22%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #f1f5f9 100%);
}

.grid-glow-background::before,
.grid-glow-background::after {
  content: '';
  position: absolute;
  inset: 0;
}

.grid-glow-background::before {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px);
  background-position: center;
  background-size: 36px 36px;
  -webkit-mask-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.75) 15%, rgba(0, 0, 0, 0.95) 85%, transparent);
  mask-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.75) 15%, rgba(0, 0, 0, 0.95) 85%, transparent);
  opacity: 0.82;
}

.grid-glow-background::after {
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.58), transparent 36%),
    radial-gradient(circle at 24% 28%, rgba(191, 219, 254, 0.22), transparent 22%),
    radial-gradient(circle at 78% 66%, rgba(226, 232, 240, 0.28), transparent 24%);
  opacity: 0.78;
}

.dark .grid-glow-background {
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.08), transparent 22%),
    radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.07), transparent 20%),
    #000;
}

.dark .grid-glow-background::before {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  opacity: 0.92;
}

.dark .grid-glow-background::after {
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.045), transparent 36%),
    radial-gradient(circle at 24% 28%, rgba(255, 255, 255, 0.035), transparent 22%),
    radial-gradient(circle at 78% 66%, rgba(255, 255, 255, 0.03), transparent 24%);
  opacity: 0.85;
}

.glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(34px);
  mix-blend-mode: multiply;
  opacity: 0.38;
}

.glow-one {
  top: -8rem;
  right: 8%;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, rgba(191, 219, 254, 0.55), rgba(191, 219, 254, 0.12) 58%, transparent 74%);
  animation: drift-one 24s ease-in-out infinite;
}

.glow-two {
  bottom: -6rem;
  left: 5%;
  width: 18rem;
  height: 18rem;
  background: radial-gradient(circle, rgba(226, 232, 240, 0.92), rgba(203, 213, 225, 0.18) 58%, transparent 74%);
  animation: drift-two 22s ease-in-out infinite;
}

.glow-three {
  top: 28%;
  left: 42%;
  width: 13rem;
  height: 13rem;
  background: radial-gradient(circle, rgba(148, 163, 184, 0.38), rgba(148, 163, 184, 0.08) 58%, transparent 76%);
  animation: drift-three 19s ease-in-out infinite;
}

.glow-four {
  top: 56%;
  right: 18%;
  width: 9rem;
  height: 9rem;
  background: radial-gradient(circle, rgba(196, 181, 253, 0.3), rgba(196, 181, 253, 0.06) 55%, transparent 76%);
  animation: drift-four 17s ease-in-out infinite;
}

.glow-five {
  top: 12%;
  left: 18%;
  width: 7rem;
  height: 7rem;
  background: radial-gradient(circle, rgba(203, 213, 225, 0.42), rgba(203, 213, 225, 0.08) 52%, transparent 74%);
  animation: drift-five 14s ease-in-out infinite;
}

.dark .glow {
  filter: blur(24px);
  mix-blend-mode: screen;
  opacity: 0.9;
}

.dark .glow-one {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02) 60%, transparent 72%);
}

.dark .glow-two {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025) 58%, transparent 74%);
}

.dark .glow-three {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.015) 58%, transparent 76%);
}

.dark .glow-four {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.01) 55%, transparent 76%);
}

.dark .glow-five {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.008) 52%, transparent 74%);
}

@keyframes drift-one {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-4vw, 5vh, 0) scale(1.1);
  }
}

@keyframes drift-two {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(5vw, -4vh, 0) scale(1.08);
  }
}

@keyframes drift-three {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-2vw, 3vh, 0) scale(1.12);
  }
}

@keyframes drift-four {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(3vw, -3vh, 0) scale(1.16);
  }
}

@keyframes drift-five {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-2vw, 4vh, 0) scale(1.14);
  }
}

@media (max-width: 640px) {
  .grid-glow-background::before {
    background-size: 26px 26px;
  }

  .glow-one {
    width: 16rem;
    height: 16rem;
    right: -2rem;
  }

  .glow-two {
    width: 13rem;
    height: 13rem;
    left: -2rem;
  }

  .glow-three {
    width: 10rem;
    height: 10rem;
    left: 38%;
  }

  .glow-four,
  .glow-five {
    width: 6rem;
    height: 6rem;
  }
}
</style>
