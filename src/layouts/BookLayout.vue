<!-- src/layouts/BookLayout.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'

const route = useRoute()
const router = useRouter()

// 가장 아래(자식)의 meta에서 pageId 가져오기
const currentPage = computed(() => {
  const m = [...route.matched].reverse().find(r => 'pageId' in r.meta)
  return m?.meta.pageId ?? 1
})

// 부모 또는 자식 meta에서 chapterId 가져오기
const currentChapterId = computed(() => {
  const m = [...route.matched].reverse().find(r => 'chapterId' in r.meta)
  return m?.meta.chapterId ?? null
})

const chapterMeta = computed(() =>
  curriculum.find(c => c.id === currentChapterId.value) || null
)

const totalPages = computed(() => chapterMeta.value?.totalPages ?? 0)
const isFirstPage = computed(() => currentPage.value <= 1)
const isLastPage  = computed(() => totalPages.value > 0 && currentPage.value >= totalPages.value)

function goToPrevPage() {
  if (isFirstPage.value || !chapterMeta.value) return
  router.push(`${chapterMeta.value.path}/page/${currentPage.value - 1}`)
}
function goToNextPage() {
  if (isLastPage.value || !chapterMeta.value) return
  router.push(`${chapterMeta.value.path}/page/${currentPage.value + 1}`)
}
</script>

<template>
  <div class="book-layout">
    <header class="book-header">
      <router-link to="/bookshelf" class="back-to-shelf">📚 책장으로 돌아가기</router-link>
      <h1>{{ chapterMeta?.title }}</h1>
    </header>

    <main class="book-content">
      <!-- 라우트 바뀔 때 안전하게 리렌더 -->
      <router-view :key="$route.fullPath" />
    </main>

    <footer class="book-navigation">
      <button @click="goToPrevPage" :disabled="isFirstPage">이전 페이지</button>
      <span class="p-nation__txt">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="isLastPage">다음 페이지</button>
    </footer>
  </div>
</template>
