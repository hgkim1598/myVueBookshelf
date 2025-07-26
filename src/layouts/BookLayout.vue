<script setup>
// 책(챕터) 내부 공통 레이아웃
defineProps({
  prevPage: { type: String, default: '' },
  nextPage: { type: String, default: '' },
})
</script>
<template>
  <div class="book-layout">
    <slot />
    <div class="pagination">
      <router-link :to="prevPage">⬅ 이전</router-link>
      <router-link :to="nextPage">다음 ➡</router-link>
    </div>
  </div>
</template>
<style scoped>
.book-layout {
  padding: 2rem;
}
.pagination {
  margin-top: 2rem;
  display: flex; 
  justify-content: space-between;
}
</style>