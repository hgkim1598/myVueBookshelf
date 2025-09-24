// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'

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

const chapterRoutes = curriculum.map(chapter => {
  const chapterChildren = []

  // 첫 페이지로 리다이렉트
  chapterChildren.push({
    path: '',
    redirect: `${chapter.path}/page/1`,
  })

  // 각 페이지 라우트 생성
  for (let i = 1; i <= chapter.totalPages; i++) {
    chapterChildren.push({
      path: `page/${i}`,
      name: `Chapter${chapter.id}Page${i}`,
      component: () => import(`@/pages/chapters/chapter-${chapter.id}/Page${i}.vue`),
      props: { chapterId: chapter.id, pageId: i }
    })
  }

  return {
    path: chapter.path,
    component: () => import('@/layouts/BookLayout.vue'),
    children: chapterChildren,
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes, ...chapterRoutes],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
