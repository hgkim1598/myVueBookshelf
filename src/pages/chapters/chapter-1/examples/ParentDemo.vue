<script setup>
import {ref} from 'vue'
import ChildCanvas from './ChildCanvas.vue';

const show = ref(true)
const color = ref('#4f46e5')

const colors = ['#4f46e5', '#16a34a', '#dc2626', '#f59e0b']
let i = 0

function cycle () {
  i = (i + 1) % colors.length
  color.value = colors[i]
}
</script>
<template>
  <section
    style="display: grid; gap: 12px;"
  >
  <div style="display: flex; gap: 8px;">
    <button @click="show = !show">{{ show ? '자식 제거' : '자식 추가' }}</button>
    <button @click="cycle">색상 변경</button>
  </div>

  <ChildCanvas
    v-if="show"
    :color="color" />
  <div v-else style="color:#888;">(자식이 언마운트됨)</div>
  </section>
</template>