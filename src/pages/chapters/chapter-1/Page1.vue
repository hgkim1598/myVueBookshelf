<script setup>
// 챕터1 - 1페이지
import BookLayout from '@/layouts/BookLayout.vue'
import ExampleComponent from './components/ExampleComponent.vue'
</script>
<template>
  <BookLayout>
    <template #default>
      <h2>📘 1-1: Vue3 Composition API 소개</h2>
      <p>setup(), ref, reactive, computed 등 기본 개념 설명</p>
      <ExampleComponent />
    </template>
  </BookLayout>
</template>