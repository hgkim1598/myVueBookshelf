// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'

// 기본 라우트
const baseRoutes = [
  {
    path: '/',
    redirect: '/bookshelf',
  },
  {
    path: '/bookshelf',
    name: 'BookShelf',
    component: () => import('@/pages/BookShelf.vue'),
  },
]

// 챕터별(부모) + 페이지별(자식) 라우트 생성
const chapterRoutes = curriculum.map((chapter) => {
  const children = []

  // 챕터 루트 → 1페이지로 리다이렉트
  children.push({
    path: '',
    redirect: `${chapter.path}/page/1`,
  })

  // 1..totalPages 정적 자식 라우트 생성
  for (let i = 1; i <= chapter.totalPages; i++) {
    children.push({
      path: `page/${i}`,
      name: `Chapter${chapter.id}Page${i}`,
      component: () =>
        import(`@/pages/chapters/chapter-${chapter.id}/Page${i}.vue`),
      // 각 Page*.vue가 props를 원한다면 사용(선택)
      props: { chapterId: chapter.id, pageId: i },
    })
  }

  return {
    path: chapter.path,
    component: () => import('@/layouts/BookLayout.vue'),
    children,
  }
})

// 최종 라우터
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...baseRoutes,
    ...chapterRoutes,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// (선택) 잘못된 페이지 번호 접근 시 방어 로직
// 현재 구조(정적 경로)에서는 /chapter-x/page/999 같은 주소가 매칭되지 않아 자동으로 404로 빠집니다.
// 아래 가드는 "매칭은 되었지만 범위 밖"인 경우를 추가 방어하고 싶을 때 사용합니다.
router.beforeEach((to) => {
  // 어떤 챕터 하위인지 식별
  const ch = curriculum.find((c) => to.path.startsWith(c.path + '/'))
  if (!ch) return

  // /page/숫자 패턴 추출
  const m = to.path.match(/\/page\/(\d+)$/)
  if (!m) return

  const page = Number(m[1])
  if (!Number.isFinite(page) || page < 1 || page > ch.totalPages) {
    return { path: `${ch.path}/page/1` }
  }
})

export default router
