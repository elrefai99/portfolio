<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useWindowSize, useRafFn } from '@vueuse/core'

const el = ref<HTMLCanvasElement | null>(null)
const size = reactive(useWindowSize())
const start = ref(() => {})
const stopped = ref(false)

const colorPalette = [
  '#ffffff10'
]

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx: any = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  const dpi = _dpi || dpr / bsr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)
  return { ctx, dpi }
}

function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

function createEffect(effectType: number) {
  return (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    let steps: (() => void)[] = []
    let prevSteps: (() => void)[] = []
    const len = 6
    const MIN_BRANCH = 10

    const step = (
      x: number, y: number, rad: number,
      counter: { value: number } = { value: 0 }
    ) => {
      const length = Math.random() * len
      counter.value += 1
      const [nx, ny] = polar2cart(x, y, length, rad)
      ctx.beginPath()
      if (effectType === 2) {
        ctx.quadraticCurveTo(
          (x + nx) / 2 + Math.random() * 5,
          (y + ny) / 2 + Math.random() * 5,
          nx, ny
        )
      } else {
        ctx.moveTo(x, y)
        ctx.lineTo(nx, ny)
      }
      ctx.stroke()

      if (effectType === 3 && Math.random() < 0.4) {
        ctx.beginPath()
        ctx.arc(nx, ny, 0.5 + Math.random(), 0, Math.PI * 2)
        ctx.fill()
      }

      if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100) return

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5
      const rad1 = rad + Math.random() * (Math.PI / 10)
      const rad2 = rad - Math.random() * (Math.PI / 10)
      if (Math.random() < rate) steps.push(() => step(nx, ny, rad1, counter))
      if (Math.random() < rate) steps.push(() => step(nx, ny, rad2, counter))
    }

    let lastTime = performance.now()
    const interval = 1000 / 70
    const controls = useRafFn(() => {
      if (performance.now() - lastTime < interval) return
      prevSteps = steps
      steps = []
      lastTime = performance.now()
      if (!prevSteps.length) return controls.pause()
      prevSteps.forEach((fn) => (Math.random() < 0.5 ? steps.push(fn) : fn()))
    }, { immediate: false })

    ctx.lineWidth = 1
    ctx.strokeStyle = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    ctx.fillStyle = ctx.strokeStyle

    const centerX = width / 2
    const centerY = height / 2

    const arms = 20
    for (let i = 0; i < arms; i++) {
      const angle = (Math.PI * 2 * i) / arms
      steps.push(() => step(centerX, centerY, angle))
    }

    controls.resume()
  }
}

onMounted(() => {
  const canvas = el.value!
  const ctx = initCanvas(canvas, size.width, size.height)
  ctx.ctx.clearRect(0, 0, size.width, size.height)

  const effect = 4 // always grow from center
  createEffect(effect)(ctx.ctx, size.width, size.height)
})
</script>

<template>
  <div class="canvas-background">
    <canvas ref="el" class="canvas"></canvas>
  </div>
</template>

<style scoped>
.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
.canvas {
  width: 100%;
  height: 100%;
}
</style>
