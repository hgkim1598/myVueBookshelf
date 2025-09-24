<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { curriculum } from '../data/curriculum'

const router = useRouter()

// const books = ref([
//   { id: 1, title: 'Vue3 핵심 문법', path: '/chapter-1' },
//   { id: 2, title: '컴포넌트 구조화', path: '/chapter-2' },
//   { id: 3, title: '반응형 원리' },
//   { id: 4, title: '이벤트와 바인딩' },
//   { id: 5, title: '컴포저블' },
//   { id: 6, title: '라우터 설정' },
//   { id: 7, title: 'Pinia 상태관리' },
//   { id: 8, title: 'API 통신' },
//   { id: 9, title: '애니메이션' },
// ])
const books = ref(curriculum.map(chapter => ({
  id: chapter.id,
  title: chapter.title,
  path: chapter.path
})))

const bookRows = ref([])
const BOOK_WIDTH = 80  // 책 폭 + margin 포함

const recalculateRows = () => {
  const shelfWidth = document.querySelector('.shelf-wrapper')?.clientWidth || window.innerWidth * 0.9
  const booksPerRow = Math.floor(shelfWidth / BOOK_WIDTH)
  const rows = []
  for (let i = 0; i < books.value.length; i += booksPerRow) {
    rows.push(books.value.slice(i, i + booksPerRow))
  }
  bookRows.value = rows
}

onMounted(() => {
  recalculateRows()
  window.addEventListener('resize', recalculateRows)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', recalculateRows)
})

/** 책 내부로 이동 */
const goToChpater = (path) =>{
  if (path) {
    router.push(path)
    console.log(path)
  }
}
</script>

<template>
  <div class="bookshelf">
    <h1 class="title">📚 나의 Vue 학습 책장</h1>
    <div class="shelf-wrapper">
      <div class="book-shelf">
        <div class="book" v-for="book in books" :key="book.id" @click="goToChpater(book.path)">
          <div class="book-numbuer">{{ book.id }}</div>
          <div class="book-tit">{{ book.title }}</div>
        </div>
      </div>
      <div class="shelf-bar" />
    </div>
  </div>
</template>

<style scoped>
.bookshelf {
  background: #c19a6b;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.title {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 2rem;
}

.shelf-wrapper {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}

/* 각 줄 */
.book-shelf {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  padding-bottom: 16px;
}

/* 책 줄 */
/* .book-row {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding-bottom: 16px;
  flex-wrap: nowrap;
  width: 100%;
} */

/* 책 스타일 */
.book {
  background: linear-gradient(145deg, #c9d6ff, #e2e2e2);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  width: 60px;
  height: 180px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  color: #2c3e50;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s;
  cursor: pointer;
  flex-shrink: 0;
}

.book:hover {
  transform: translateY(-10px);
}

/* 나무 판자 */
.shelf-bar {
  width: 100%;
  height: 14px;
  background: #6e4b34;
  border-top: 3px solid #4a2f1b;
  border-bottom: 2px solid #3b2214;
  border-radius: 4px;
}

.book-numbuer{
  color: #fff;
  background: #2c3e50;
  border-radius: 50%;
  writing-mode: unset;
  padding: 0px 8px;
}
.book-tit{
  writing-mode: vertical-lr;
  text-orientation: upright; /* 모든 글자를 세로 방향으로 정렬 */
  -webkit-text-orientation: upright;
}
</style>
