import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const ifUserIsLoggedIn = () => {
  if (!localStorage.getItem('access_token')) {
    router.push({ name: 'login' })
  }
}

const ifUserIsNotLoggedIn = () => {
  if (localStorage.getItem('access_token')) {
    router.push({ name: 'home' })
  }
}

const ifUserAdmin = () => {
  const authStore = useAuthStore()
  if (authStore.user?.role !== 'admin') {
    router.push({ name: 'profile' })
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
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/ContactsView.vue'),
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
      beforeEnter: ifUserAdmin,
    },
    {
      path: '/admin/users',
      name: 'admin.users',
      component: () => import('@/views/admin/users/UsersView.vue'),
      beforeEnter: ifUserAdmin,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/HomeView.vue'),
      beforeEnter: ifUserIsLoggedIn,
    },
    {
      path: '/profile/settings',
      name: 'profile.settings',
      component: () => import('@/views/profile/SettingsView.vue'),
      beforeEnter: ifUserIsLoggedIn,
    },
  ],
})

export default router
