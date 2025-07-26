<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const books = ref([
  { id: 1, title: '1. Vue3 핵심 문법' },
  { id: 2, title: '2. 컴포넌트 구조화' },
  { id: 3, title: '3. 반응형 원리' },
  { id: 4, title: '4. 이벤트와 바인딩' },
  { id: 5, title: '5. 컴포저블' },
  { id: 6, title: '6. 라우터 설정' },
  { id: 7, title: '7. Pinia 상태관리' },
  { id: 8, title: '8. API 통신' },
  { id: 9, title: '9. 애니메이션' },
])

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
</script>

<template>
  <div class="bookshelf">
    <h1 class="title">📚 나의 Vue 학습 책장</h1>
    <div class="shelf-wrapper">
      <div class="book-shelf" v-for="(row, rowIndex) in bookRows" :key="rowIndex">
        <div class="book-row">
          <div class="book" v-for="book in row" :key="book.id">{{ book.title }}</div>
        </div>
        <div class="shelf-bar" />
      </div>
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
  margin-bottom: 60px;
  position: relative;
}

/* 책 줄 */
.book-row {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding-bottom: 16px;
  flex-wrap: nowrap;
}

/* 책 스타일 */
.book {
  background: linear-gradient(145deg, #c9d6ff, #e2e2e2);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  width: 60px;
  height: 180px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-weight: bold;
  color: #2c3e50;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  cursor: pointer;
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
</style>
