<script setup>
import { ref, onMounted, onUnmounted, onUpdated, nextTick } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#4f46e5'
  }
})

const canvas = ref(null)
let ctx = null
let timer = null

function draw () {
  if (!ctx) return
  ctx.clearRect(0, 0, 300, 100)
  ctx.fillStyle = props.color
  ctx.fillRect(10, 10, 280, 80)
}

function handlekey (e) {
  if (e.key === 'r') draw()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  draw()
  window.addEventListener('keydown', handlekey)
  timer = setInterval(draw, 2000)
})

onUpdated(async () => {
  await nextTick()
  draw()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handlekey)
  clearInterval(timer)
})
</script>
<template>
  <canvas
    ref="canvas"
    width="300"
    height="100"
    style="border: 1px solid #ddd; border-radius: 8px;"
    ></canvas>
</template>