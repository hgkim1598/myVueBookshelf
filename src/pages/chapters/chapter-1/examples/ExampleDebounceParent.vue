<script setup>
import { ref } from 'vue'
import DebouncedInput from './DebouncedInput.vue'

// 검색어 상태
const keyword = ref('')
</script>

<template>
  <div class="parent-demo">
    <h4>검색 디바운스 테스트</h4>

    <!-- 300ms 후 .trim 적용된 값이 반영 -->
    <DebouncedInput v-model.trim="keyword" :delay="300" />

    <p class="preview">검색어: <strong>{{ keyword }}</strong></p>
  </div>
</template>

<style scoped>
.parent-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.preview {
  margin-top: 8px;
  font-size: 14px;
}
</style>
