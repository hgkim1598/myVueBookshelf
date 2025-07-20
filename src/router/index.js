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
    component: () => import('@/pages/chapters/chapter-1/index.vue'),
    children: [
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
})

export default router
