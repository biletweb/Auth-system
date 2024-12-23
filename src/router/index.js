import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore.js'

function ifUserIsLoggedIn() {
  const authStore = useAuthStore()
  if (!authStore.user) {
    return { name: 'login' }
  }
}

function ifUserIsNotLoggedIn() {
  const authStore = useAuthStore()
  if (authStore.user) {
    return { name: 'home' }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      beforeEnter: ifUserIsNotLoggedIn,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      beforeEnter: ifUserIsNotLoggedIn,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/HomeView.vue'),
      beforeEnter: ifUserIsLoggedIn,
    },
  ],
})

export default router
