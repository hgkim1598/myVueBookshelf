<!-- src/pages/chapters/chapter-1/Page1.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'
import ContentPage from '@/pages/ContentPage.vue' // 또는 '@/components/ContentPage.vue'

// 데모용 상태: 실행 결과 영역에서 실제로 반응하도록
const count = ref(0)
const doubled = computed(() => count.value * 2)

// (선택) 이전/다음 페이지 네비게이션: 기존에 만드신 로직 재사용
const route = useRoute()
const chapterPath = route.path.split('/page')[0]
const currentChapter = curriculum.find(c => c.path === chapterPath)
const currentPage = Number(route.params.pageId ?? 1)
const isFirst = currentPage <= 1
const isLast  = currentPage >= (currentChapter?.totalPages ?? 1)
const prevPath = `${currentChapter?.path}/page/${currentPage - 1}`
const nextPath = `${currentChapter?.path}/page/${currentPage + 1}`
</script>

<template>
  <ContentPage>
    <!-- 제목 -->
    <template #title>
      <h2>📘 1-1: Vue 3 Composition API 소개</h2>
    </template>

    <!-- 좌측: 개념 -->
    <template #concept>
      <ul>
        <li><strong>setup()</strong>: Composition API의 진입점</li>
        <li><strong>ref</strong> / <strong>reactive</strong>: 반응형 상태 만들기</li>
        <li><strong>computed</strong>: 계산된 값(파생 상태)</li>
      </ul>
      <p>Composition API는 로직을 기능 단위로 모듈화하고 재사용하기에 유리합니다.</p>
    </template>

    <!-- 우측 상단: 코드 -->
    <template #code>
      <pre><code>
import &#123; ref, computed &#125; from 'vue'

const count = ref(0)
const doubled = computed(() =&gt; count.value * 2)
      </code></pre>
    </template>

    <!-- 우측 하단: 실행 결과 (실제 인터랙션) -->
    <template #result>
      <div style="display:flex; gap:12px; align-items:center;">
        <button @click="count++">+1</button>
        <span>count: {{ count }}</span>
        <span> / doubled: {{ doubled }}</span>
      </div>
    </template>

    <!-- (선택) 페이지 네비게이션 -->
    <template #pager>
      <RouterLink v-if="!isFirst" :to="prevPath">← 이전</RouterLink>
      <div style="flex:1"></div>
      <RouterLink v-if="!isLast" :to="nextPath">다음 →</RouterLink>
    </template>
  </ContentPage>
</template>

<style scoped>
button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fafafa;
  cursor: pointer;
  color: #333;
}
button:active { transform: translateY(1px); }
</style>
