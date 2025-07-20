<script setup>
// 책장에 꽂힌 책 하나
defineProps({
  title: String,
  to: String,
})
</script>
<template>
  <router-link :to="to" class="book-card">
    <div class="cover">{{ title }}</div>
  </router-link>
</template>
<style scoped>
.book-card {
  border: 2px solid #ccc;
  padding: 1rem;
  width: 200px;
  text-align: center;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: all 0.3s;
}
.book-card:hover {
  background-color: #e0e0ff;
}
</style>