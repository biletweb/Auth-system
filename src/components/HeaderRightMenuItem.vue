<template>
  <ul class="flex gap-4">
    <li v-if="authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'admin' }">Admin</router-link>
    </li>
    <li v-if="authStore.user">Hi, {{ authStore.user?.name }}</li>
    <li v-if="authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link to="#" @click="logout">Logout</router-link>
    </li>
    <li v-if="!authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </li>
    <li v-if="!authStore.user" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'register' }">Register</router-link>
    </li>
  </ul>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, getConfig(authStore.access_token))
    authStore.clearState()
    toast.success(response.data.message, { timeout: 5000 })
    router.push({ name: 'login' })
  } catch (error) {
    if (error.response.status === 401) {
      authStore.clearState()
      toast.error(error.response.data.message, { timeout: 5000 })
    }
  }
}
</script>
