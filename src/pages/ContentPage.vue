<template>
  <div class="content-page" v-if="pageData">
    <h2>{{ pageData.title }}</h2>
    
    <div class="content-section">
      <h3>📖 개념</h3>
      <div class="concept-content" v-html="formattedContent"></div>
    </div>
    
    <div class="code-section">
      <h3>💻 코드</h3>
      <pre><code>{{ pageData.code }}</code></pre>
    </div>
    
    <div class="result-section">
      <h3>✨ 실행 결과</h3>
      <p>{{ pageData.result }}</p>
    </div>
  </div>
  <div v-else>
    페이지를 찾을 수 없습니다.
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { curriculum } from '@/data/curriculum.js'

const props = defineProps({
  chapterId: Number,
  pageId: Number,
})

const pageData = computed(() => {
  const chapter = curriculum.find(c => c.id === props.chapterId)
  return chapter?.pages.find(p => p.page === props.pageId)
})

const formattedContent = computed(() => {
  if (!pageData.value?.content) return ''
  return pageData.value.content.replace(/\n/g, '<br>')
})
</script>

<style scoped>
.content-page {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.content-section, .code-section, .result-section {
  margin-bottom: 2rem;
}

h3 {
  color: #333;
  margin-bottom: 1rem;
}

pre {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.concept-content {
  line-height: 1.6;
  color: #555;
}

.result-section p {
  background: #e8f5e8;
  padding: 1rem;
  border-radius: 4px;
  border-left: 4px solid #4caf50;
}
</style>