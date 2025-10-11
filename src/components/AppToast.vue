<script setup>
import { ref } from 'vue'

const open = ref(false)
const text = ref('')
const type = ref('default') // success|error|info|default
const timeout = 2200
let timer = null

function show(msg, t = 'default') {
  console.log('[Toast] show:', msg, t)
  text.value = msg
  type.value = t
  open.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (open.value = false), timeout)
}

defineExpose({ show })
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="toast"
      :class="type"
      role="status"
      aria-live="polite"
    >
      {{ text }}
    </div>
  </transition>
</template>

<style>
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  padding: 10px 14px;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  z-index: 2147483647;
}
.toast.success { background: #10b981; }
.toast.error { background: #ef4444; }
.toast.info { background: #3b82f6; }
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
