<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'

const route = useRoute()
const router = useRouter()

const currentChapter = computed(() => {
  const chapterPath = route.path.split('/page')[0]
  return curriculum.find(chapter => chapter.path === chapterPath)
})

const currentPageId = computed(() => parseInt(route.params.pageId, 10))
const totalPages = computed(() => currentChapter.value?.totalPages || 0)

const goToPrevPage = () => {
  if (currentPageId.value > 1) {
    router.push(`${currentChapter.value.path}/page/${currentPageId.value - 1}`)
  }
}

const goToNextPage = () => {
  if (currentPageId.value < totalPages.value) {
    router.push(`${currentChapter.value.path}/page/${currentPageId.value + 1}`)
  }
}
</script>


<template>
  <div class="book-layout">
    <header class="book-header">
      <router-link to="/bookshelf" class="back-to-shelf">
        📚 책장으로 돌아가기
      </router-link>
      <h1>{{ currentChapter?.title }}</h1>
    </header>
    
    <main class="book-content">
      <router-view />
    </main>
    
    <footer class="book-navigation">
      <button @click="goToPrevPage" :disabled="isFirstPage">이전 페이지</button>
      <span>{{ currentPageId }} / {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="isLastPage">다음 페이지</button>
    </footer>
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
