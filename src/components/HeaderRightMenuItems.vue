<template>
  <nav>
    <ul class="flex items-center gap-4">
      <li class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <button @click="toggleDark()" type="button" class="flex items-center text-lg">
          <i
            v-if="isDark"
            v-tooltip="{ content: $t('Dark mode'), distance: 10, delay: { show: 2000, hide: 100 } }"
            class="pi pi-moon me-1 text-sky-500"
          ></i>
          <i
            v-else
            v-tooltip="{ content: $t('Light mode'), distance: 10, delay: { show: 2000, hide: 100 } }"
            class="pi pi-sun me-1 text-amber-500"
          ></i>
          <span>{{ $t('Theme') }}</span>
        </button>
      </li>
      <li v-if="authStore.user" class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link :to="{ name: 'profile' }" class="flex items-center text-lg"
          ><i class="pi pi-user me-1"></i>{{ $t('Profile') }}</router-link
        >
      </li>
      <li v-if="loading">
        <Spinner class="w-5 dark:rounded-full dark:bg-indigo-500 dark:p-1" />
      </li>
      <li v-else-if="authStore.user" class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link to="#" @click="logout" class="flex items-center text-lg"
          ><i class="pi pi-sign-out me-1"></i>{{ $t('Logout') }}</router-link
        >
      </li>
      <li v-if="!authStore.user" class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link :to="{ name: 'login' }" class="flex items-center text-lg"
          ><i class="pi pi-sign-in me-1"></i>{{ $t('Login') }}</router-link
        >
      </li>
      <li v-if="!authStore.user" class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link :to="{ name: 'register' }" class="flex items-center text-lg">
          <i class="pi pi-user-plus me-1"></i>{{ $t('Register') }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/main.js'
import { useDark, useToggle } from '@vueuse/core'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const loading = ref(false)
const { locale } = useI18n()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const logout = async () => {
  loading.value = true
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, getConfig(authStore.access_token))
    authStore.clearState()
    locale.value = 'uk'
    router.push({ name: 'login' })
    toast.success(i18n.global.t(response.data.message), { timeout: 5000 })
  } catch (error) {
    if (error.response && error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000 })
    } else {
      toast.error(i18n.global.t(error.message), { timeout: 5000 })
    }
  } finally {
    loading.value = false
  }
}
</script>
