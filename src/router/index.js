import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'starting',
      component: () => import('../views/StartingPage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: {
    },
    },
    {
      path: '/editprofile:userId',
      name: 'editprofile',
      component: () => import('../views/ProfileEdit.vue'),
      meta: {
        pageTitle: "Edytuj profil",
      },
    },
    {
    path: '/events',
    name: 'events',
    component: () => import('../views/EventsMainView.vue'),
    meta: {
      pageTitle: "Wydarzenia",
    },
    },
    {
    path: '/newevent',
    name: 'newevent',
    component: () => import('../views/EventAddView.vue'),
    meta: {
      pageTitle: "Dodaj wydarzenie",
    },
    },
    {
      path: '/event/:key',
      name: 'event',
      component: () => import('../views/EventDetailsView.vue'),
      meta: {
        pageTitle: "Podgląd wydarzenia",
      },
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: () => import('../views/ProfileList.vue'),
      meta: {
        pageTitle: "Użytkownicy",
      },
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        pageTitle: "Profil",
      },
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../views/ForumMainView.vue'),
      meta: {
        pageTitle: "Psie forum",
      },
    },
    {
      path: '/section/:sectionKey',
      name: 'section',
      component: () => import('../views/ForumSectionView.vue'),
      meta: {
        pageTitle: "Psie forum",
      },
    },
    {
      path: '/section/:sectionKey/thread/:threadId',
      name: 'forumThread',
      component: () => import('../views/ForumSingleTopicView.vue'),
      meta: {
        pageTitle: "Psie forum",
      },
    },
    {
      path: '/section/:sectionKey/thread/newThread',
      name: 'forumNewThread',
      component: () => import('../views/ForumNewThreadView.vue'),
      meta: {
        pageTitle: "Nowy wątek",
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        pageTitle: "Zarejestruj się",
    },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignInView.vue'),
      meta: {
        pageTitle: "Zaloguj się",
    },
    },
    
  ]
})

export default router
