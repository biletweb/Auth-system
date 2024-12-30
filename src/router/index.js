import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const isLoggedIn = () => {
  if (!localStorage.getItem('access_token')) {
    router.push({ name: 'login' })
  }
}

const isNotLoggedIn = () => {
  if (localStorage.getItem('access_token')) {
    router.push({ name: 'home' })
  }
}

const adminRole = () => {
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
      beforeEnter: isNotLoggedIn,
    },
    {
      path: '/login/forgot-password',
      name: 'login.forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      beforeEnter: isNotLoggedIn,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      beforeEnter: isNotLoggedIn,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/HomeView.vue'),
      beforeEnter: adminRole,
    },
    {
      path: '/admin/users',
      name: 'admin.users',
      component: () => import('@/views/admin/users/UsersView.vue'),
      beforeEnter: adminRole,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/HomeView.vue'),
      beforeEnter: isLoggedIn,
    },
    {
      path: '/profile/settings',
      name: 'profile.settings',
      component: () => import('@/views/profile/SettingsView.vue'),
      beforeEnter: isLoggedIn,
    },
  ],
})

export default router
