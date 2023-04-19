import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/AuthorsView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../views/ForumMainView.vue')
    },
    {
      path: '/section/:key',
      name: 'forumSection',
      component: () => import('../views/ForumSectionView.vue')
    },
    {
      path: '/section/:sectionKey/topic/:threadId',
      name: 'forumThread',
      component: () => import('../views/ForumSingleTopicView.vue')
    }
  ]
})

export default router
