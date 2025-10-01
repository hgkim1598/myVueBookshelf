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
const goToChpater = (path, id) =>{
  if (!path || !id) return
  router.push(`${path}/page/1`)
}
</script>

<template>
  <div class="bookshelf">
    <h1 class="title">📚 나의 Vue 학습 책장</h1>
    <div class="shelf-wrapper">
      <div class="book-shelf">
        <div class="book" v-for="book in books" :key="book.id" @click="goToChpater(book.path, book.id)">
          <div class="book-numbuer">{{ book.id }}</div>
          <div class="book-tit">{{ book.title }}</div>
        </div>
      </div>
      <div class="shelf-bar" />
    </div>
  </div>
</template>

<style scoped>

</style>