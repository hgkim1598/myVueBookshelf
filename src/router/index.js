import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/bookshelf',
  },
  {
    path: '/bookshelf',
    component: () => import('@/pages/Bookshelf.vue'),
  },
  {
    path: '/chapter-1',
    name: 'chapter-1',
    component: () => import('@/pages/chapters/chapter-1/index.vue'),
    meta: { title: '1주차: Vue3 핵심 문법' },
    children: [
      {
        path: '',
        redirect: '/chapter-1/page-1',
      },
      {
        path: 'page-1',
        component: () => import('@/pages/chapters/chapter-1/Page1.vue'),
      },
      // {
      //   path: 'page-2',
      //   component: () => import('@/pages/chapters/chapter-1/Page2.vue'),
      // },
    ],
  },
  // chapter-2도 같은 방식으로 계속 추가
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 } // 페이지 이동시 맨 위로 이동
  },
})

// 라우트 변경 후 문서 타이틀 갱신
router.afterEach((to) => {
  document.title = to.meta?.title ?? 'My Vue Bookshelf'
})

export default router
