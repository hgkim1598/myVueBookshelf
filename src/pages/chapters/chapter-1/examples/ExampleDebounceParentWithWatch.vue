<script setup>
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import DebouncedInputWithWatch from './DebouncedInputWithWatch.vue';

const keyword = ref('')
const category = ref('all')
const controller = { current: null }
const loading = ref(false)
const products = ref([])
const error = ref('')

const qs = computed(() => new URLSearchParams({
  q: keyword.value,
  category: category.value
}).toString())

async function fetchProducts() {
  if (controller.current) controller.current.abort()
  controller.current = new AbortController()
  loading.value = true
  error.value = ''

  try {
    await new Promise((res) => setTimeout(res, 400))
    products.value = [
      { id: 1, name: `Result for "${keyword.value}" in ${category.value}`}
    ]
  } catch (e) {
    if (e.name !== 'AbortError') error.value = '요청 중 오류 발생'
  } finally {
    loading.value = false
  }
}

watch([keyword, category], fetchProducts, { immediate: true })

onBeforeUnmount(() => {
  if (controller.current) controller.current.abort()
})
</script>

<template>
  <section>
    <DebouncedInputWithWatch
      v-model.trim="keyword"
      :delay="300"
      placeholder="검색어"
    />

    <select v-model="category">
      <option value="all">전체</option>
      <option value="book">도서</option>
      <option value="device">기기</option>
    </select>

    <div v-if="loading">검색 중... ⌛</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="p in products" :key="p.id">
        {{ p.name }}
      </li>
    </ul>
  </section>
</template>