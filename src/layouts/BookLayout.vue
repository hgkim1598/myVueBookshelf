<!-- src/layouts/BookLayout.vue -->
<script setup>
defineProps({
  prevPage: { type: String, default: '' },
  nextPage: { type: String, default: '' },
});
</script>

<template>
  <div class="book-layout">
    <div class="book-pages">
      <div class="left-page">
        <slot name="left" />
      </div>
      <div class="right-page">
        <slot name="right" />
      </div>
    </div>
    <div class="pagination">
      <router-link :to="prevPage" v-if="prevPage">⬅ 이전</router-link>
      <router-link :to="nextPage" v-if="nextPage">다음 ➡</router-link>
    </div>
  </div>
</template>

<style scoped>
.book-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.book-pages {
  display: flex;
  width: 100%;
  max-width: 900px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.left-page,
.right-page {
  width: 50%;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.right-page {
  border-right: none;
  background-color: #f9f9f9;
}

.pagination {
  margin-top: 1.5rem;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
}
</style>
