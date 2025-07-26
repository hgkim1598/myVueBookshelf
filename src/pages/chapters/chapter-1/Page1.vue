<script setup>
import BookLayout from '@/layouts/BookLayout.vue'
// import ExampleComponent from './components/ExampleComponent.vue'
</script>

<template>
  <BookLayout prevPage="" nextPage="/chapters/chapter-1/page2">
    <template #left>
      <h2>📘 1-1: Vue3 Composition API 소개</h2>
      <ul>
        <li><strong>setup()</strong>: Composition API 진입점</li>
        <li><strong>ref</strong>와 <strong>reactive</strong>: 반응형 상태 만들기</li>
        <li><strong>computed</strong>: 계산된 상태 만들기</li>
      </ul>
    </template>

    <template #right>
      <p><strong>코드:</strong></p>
      <pre><code>const count = ref(0);</code></pre>
      <p><strong>결과:</strong></p>
      <!-- <ExampleComponent /> -->
    </template>
  </BookLayout>
</template>
