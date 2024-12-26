<template>
  <ul class="flex items-center gap-4">
    <li v-if="authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'profile' }" class="text-lg">
        <i class="pi pi-user me-1"></i>{{ $t('Profile') }}
      </router-link>
    </li>
    <li v-if="loading">
      <Spinner class="w-5" />
    </li>
    <li v-else-if="authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link to="#" @click="logout" class="text-lg">
        <i class="pi pi-sign-out me-1"></i>{{ $t('Logout') }}
      </router-link>
    </li>
    <li v-if="!authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'login' }" class="text-lg">
        <i class="pi pi-sign-in me-1"></i>{{ $t('Login') }}
      </router-link>
    </li>
    <li v-if="!authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'register' }" class="text-lg">
        <i class="pi pi-user-plus me-1"></i>{{ $t('Register') }}
      </router-link>
    </li>
  </ul>
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

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const loading = ref(false)
const { locale } = useI18n()

const logout = async () => {
  loading.value = true
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, getConfig(authStore.access_token))
    authStore.clearState()
    locale.value = 'uk'
    router.push({ name: 'login' })
    toast.success(response.data.message, { timeout: 5000 })
  } catch (error) {
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(error.response.data.message, { timeout: 5000 })
    }
  } finally {
    loading.value = false
  }
}
</script>
