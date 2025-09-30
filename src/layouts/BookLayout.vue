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

const currentPageId = computed(() => {
  const n = Number(route.params.pageId)
  return Number.isFinite(n) ? n : 1
})

const totalPages = computed(() => currentChapter.value?.totalPages ?? 0)

const isFirstPage = computed(() => currentPageId.value <= 1)
const isLastPage  = computed(() => currentPageId.value >= totalPages.value)

const goToPrevPage = () => {
  if (!isFirstPage.value) {
    router.push(`${currentChapter.value.path}/page/${currentPageId.value - 1}`)
  }
}

const goToNextPage = () => {
  if (!isLastPage.value) {
    router.push(`${currentChapter.value.path}/page/${currentPageId.value + 1}`)
  }
}
</script>

<template>
  <div class="book-layout">
    <header class="book-header">
      <router-link to="/bookshelf" class="back-to-shelf">📚 책장으로 돌아가기</router-link>
      <h1>{{ currentChapter?.title }}</h1>
    </header>

    <main class="book-content">
      <router-view />
    </main>

    <footer class="book-navigation">
      <button @click="goToPrevPage" :disabled="isFirstPage">이전 페이지</button>
      <span class="p-nation__txt">{{ currentPageId }} / {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="isLastPage">다음 페이지</button>
    </footer>
  </div>
</template>
