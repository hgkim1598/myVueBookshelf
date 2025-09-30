import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { curriculum } from '@/data/curriculum.js'
import router from '@/router'

export const useReadingStore = defineStore('reading', () => {
  const chapterSlug = ref('chapter-1')  // 'chapter-1'
  const page = ref(1)                   // 1-based

  // slug -> path 매핑 ('chapter-1' -> '/chapter-1')
  const chapterPath = computed(() => `/${chapterSlug.value}`)

  const chapterMeta = computed(() => {
    return curriculum.find(c => c.path === chapterPath.value) || null
  })

  const totalPages = computed(() => chapterMeta.value?.totalPages ?? 0)
  const isFirst = computed(() => page.value <= 1)
  const isLast  = computed(() => totalPages.value > 0 && page.value >= totalPages.value)

  // URL -> 스토어 동기화
  function syncFromRoute(route) {
    const slug = String(route.params.chapter || 'chapter-1')
    const p = Number(route.params.pageId || 1)

    chapterSlug.value = slug
    // 경계 보정
    const max = curriculum.find(c => c.path === `/${slug}`)?.totalPages ?? 0
    if (!Number.isFinite(p) || p < 1) {
      page.value = 1
    } else if (max && p > max) {
      page.value = max
    } else {
      page.value = p
    }
  }

  function setChapterBySlug(slug) {
    chapterSlug.value = slug
    // 챕터 바꾸면 페이지도 1로 초기화(원하면 최근 페이지 기억 로직 추가 가능)
    page.value = 1
    pushUrl()
  }

  function setPage(p) {
    if (!Number.isFinite(p)) return
    const max = totalPages.value || 1
    page.value = Math.min(Math.max(1, p), max)
    pushUrl()
  }

  function goPrev() {
    if (isFirst.value) return
    page.value -= 1
    pushUrl()
  }

  function goNext() {
    if (isLast.value) return
    page.value += 1
    pushUrl()
  }

  function pushUrl() {
    // 현재 상태를 URL에 반영
    router.push(`/${chapterSlug.value}/page/${page.value}`)
  }

  return {
    // state
    chapterSlug, page,
    // derived
    chapterMeta, totalPages, isFirst, isLast, chapterPath,
    // actions
    syncFromRoute, setChapterBySlug, setPage, goPrev, goNext,
  }
})
