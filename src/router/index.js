import { createRouter, createWebHistory } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'

// 페이지 파일 매핑 (Vite 전용)
const pageModules = import.meta.glob('/src/pages/chapters/chapter-*/Page*.vue')

const baseRoutes = [
  { path: '/', redirect: '/bookshelf' },
  { path: '/bookshelf', name: 'BookShelf', component: () => import('@/pages/BookShelf.vue') },
]

const chapterRoutes = curriculum.map((chapter) => {
  const children = []

  // 챕터 루트 -> 1페이지
  children.push({ path: '', redirect: 'page/1' })

  // 1..totalPages
  for (let i = 1; i <= chapter.totalPages; i++) {
    const key = `/src/pages/chapters/chapter-${chapter.id}/Page${i}.vue`
    const loader = pageModules[key]
    if (!loader) {
      // 파일이 없으면 스킵하거나 404로 유도
      // console.warn(`[router] 파일 없음: ${key}`)
      continue
    }
    children.push({
      path: `page/${i}`,
      name: `Chapter${chapter.id}Page${i}`,
      component: loader,                // import() 대신 glob 매핑 사용
      meta: { chapterId: chapter.id, pageId: i },
      // props: { chapterId: chapter.id, pageId: i }, // 필요 시
    })
  }

  return {
    path: chapter.path, // 예: '/chapter-1'
    component: () => import('@/layouts/BookLayout.vue'),
    meta: { chapterId: chapter.id },    // 부모에도 chapterId 심어두면 편함
    children,
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes, ...chapterRoutes],
  scrollBehavior() {
    return { top: 0 }
  },
})

// 범위 밖 방어(정적 경로라 사실상 불필요하지만 유지해도 무방)
router.beforeEach((to) => {
  const ch = curriculum.find((c) => to.path.startsWith(c.path + '/'))
  if (!ch) return
  const m = to.path.match(/\/page\/(\d+)$/)
  if (!m) return
  const page = Number(m[1])
  if (!Number.isFinite(page) || page < 1 || page > ch.totalPages) {
    return { path: `${ch.path}/page/1` }
  }
})

export default router
