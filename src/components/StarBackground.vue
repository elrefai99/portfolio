<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useWindowSize, useRafFn } from '@vueuse/core'

const el = ref<HTMLCanvasElement | null>(null)
const size = reactive(useWindowSize())

// Star interface for starry background
interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
  vx: number
  vy: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
}

function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx: any = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1
  const bsr: number =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  const dpi: number = _dpi || dpr / bsr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)
  return { ctx, dpi }
}

// Starry sky effect
function createStarryEffect(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const isDark = document.documentElement.classList.contains('dark')
  const starColor = isDark ? '#ffffff' : '#000000'
  
  // Create stars
  const stars: Star[] = []
  const starCount = Math.floor((width * height) / 3000)
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1
    })
  }

  // Create shooting stars
  const shootingStars: ShootingStar[] = []
  
  const createShootingStar = () => {
    if (Math.random() < 0.01 && shootingStars.length < 3) {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI / 6 + Math.PI / 4,
        opacity: 1
      })
    }
  }

  const controls = useRafFn(() => {
    ctx.clearRect(0, 0, width, height)
    
    // Draw stars with twinkling effect and movement
    stars.forEach(star => {
      // Update position
      star.x += star.vx
      star.y += star.vy
      
      // Wrap around screen edges
      if (star.x < 0) star.x = width
      if (star.x > width) star.x = 0
      if (star.y < 0) star.y = height
      if (star.y > height) star.y = 0
      
      // Twinkling effect
      star.twinklePhase += star.twinkleSpeed
      const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7
      
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = `${starColor}${Math.floor(star.opacity * twinkle * 255).toString(16).padStart(2, '0')}`
      ctx.fill()
      
      // Add glow effect for larger stars
      if (star.radius > 1) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = `${starColor}${Math.floor(star.opacity * twinkle * 0.2 * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      }
    })

    // Create new shooting stars occasionally
    createShootingStar()

    // Draw and update shooting stars
    shootingStars.forEach((star, index) => {
      const dx = Math.cos(star.angle) * star.speed
      const dy = Math.sin(star.angle) * star.speed
      
      star.x += dx
      star.y += dy
      star.opacity -= 0.01

      if (star.opacity > 0) {
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        gradient.addColorStop(0, `${starColor}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${starColor}00`)

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        ctx.stroke()
      } else {
        shootingStars.splice(index, 1)
      }
    })
  }, { immediate: true })

  return controls
}

function drawEffect() {
  const canvas = el.value!
  if (!canvas) return
  const { ctx } = initCanvas(canvas, size.width, size.height)
  ctx.clearRect(0, 0, size.width, size.height)

  createStarryEffect(ctx, size.width, size.height)
}

onMounted(() => {
  drawEffect()
  const observer = new MutationObserver(() => {
    drawEffect()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  onUnmounted(() => observer.disconnect())
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
