<script setup>
// 책장 첫 화면
import { useRouter } from 'vue-router'

const router = useRouter()
const books = [
  { id: 1, title: '1. Vue3 핵심 문법', path: '/chapter1' },
  { id: 2, title: '2. 컴포넌트 구조화', path: '/chapter2' },
]

const goToChapter = (path) => {
  router.push(path)
}

</script>
<template>
  <div class="bookshelf">
    <h1 class="title">📚 나의 Vue 학습 책장</h1>
    <div class="shelf">
      <div
        v-for="book in books"
        :key="book.id"
        class="book"
        @click="goToChapter(book.path)"
      >
        <span>{{ book.title }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bookshelf {
  background: #C19A6B;
  color: #eee;
  text-align: center;
  padding: 2rem;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.shelf {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.book {
  background: linear-gradient(145deg, #c9d6ff, #e2e2e2);
  border-radius: 10px;
  padding: 2rem 1.5rem;
  width: 180px;
  height: 240px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #3b3b98;
  font-size: 1.1rem;
}

.book:hover {
  transform: translateY(-10px);
}
</style>