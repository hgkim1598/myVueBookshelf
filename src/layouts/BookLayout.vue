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
<style>
:root {
  --book-bg: #0b1f2a;
  --text: #f5f7fa;
  --muted: #cbd5e1;
  --accent: #22c55e;
  --btn-bg: #111827;
  --btn-bg-disabled: #374151;
  --btn-text: #ffffff;
  --container-w: 1000px;
}
</style>
<style scoped>

/* ===== 레이아웃 ===== */
.book-layout {
  height: 100dvh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--book-bg);
  padding: 32px 20px 48px;
  box-sizing: border-box;
  overflow: hidden;
}

/* 헤더 */
.book-header {
  width: 100%;
  max-width: var(--container-w);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  text-align: center;
}
.book-header h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 56px);
  line-height: 1.15;
  color: var(--text);
  font-weight: 800;
}
.back-to-shelf {
  color: var(--accent);
  font-weight: 700;
  text-decoration: none;
}
.back-to-shelf:hover { text-decoration: underline; }

/* 본문 */
.book-content {
  flex: 1 1 auto;
  min-height: 0;
  width: 100dvw;
  min-width: var(--container-w);
  color: var(--text);
  overflow: hidden;
}

/* 하단 페이지 네비게이션 */
.book-navigation {
  width: 100%;
  max-width: var(--container-w);
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
}

.book-navigation button {
  border: 0;
  border-radius: 12px;
  padding: 12px 20px;
  background: var(--btn-bg);
  color: var(--btn-text);
  font-weight: 700;
  cursor: pointer;
  transition: transform .06s ease, opacity .2s ease;
}
.book-navigation button:active { transform: translateY(1px); }
.book-navigation button:disabled {
  background: var(--btn-bg-disabled);
  opacity: .6;
  cursor: not-allowed;
}

.p-nation__txt {
  color: var(--muted);
  font-weight: 700;
}

/* 작은 화면 보완 */
@media (max-width: 640px) {
  .book-layout { padding: 20px 14px 32px; }
  .book-navigation { gap: 10px; }
  .book-navigation button { padding: 10px 14px; }
}
</style>
