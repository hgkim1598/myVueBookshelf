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
      <router-link :to="prevPage" v-if="prevPage" ><span class="p-nation__txt">⬅ 이전<</span></router-link>
      <router-link :to="nextPage" v-if="nextPage"><span class="p-nation__txt">다음 ➡</span></router-link>
    </div>
  </div>
</template>

<style scoped>
.book-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #00715A;
  overflow-y: auto;
  overflow-x: hidden;
}

.book-pages {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.left-page,
.right-page {
  width: 50%;
  padding: 1rem;
  border-right: 1px solid #ddd;
  background-color: #f9f9f9;
}

.right-page {
  border-right: none;
}

.pagination {
  margin-top: 1.5rem;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
}
.p-nation__txt{
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
</style>
