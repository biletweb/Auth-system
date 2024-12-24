<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold">Profile</span>
      <button
        @click="syncProfile"
        class="text-blue-500 transition duration-300 hover:text-blue-600"
      >
        <i class="pi pi-sync ms-2" style="font-size: 25px"></i>
      </button>
    </div>
    <div class="flex items-center gap-4">
      <div v-if="authStore.user?.role === 'admin'">
        <router-link
          :to="{ name: 'admin' }"
          class="font-bold text-red-500 transition duration-300 hover:text-red-600"
        >
          <i class="pi pi-wrench me-1"></i>Administration panel
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'profile.settings' }"
          class="font-bold text-blue-500 transition duration-300 hover:text-blue-600"
        >
          <i class="pi pi-cog me-1"></i>Settings
        </router-link>
      </div>
    </div>
  </div>
  <div class="card rounded-lg bg-white p-4">
    <div v-if="!authStore.user || loading" class="flex justify-center">
      <Spinner class="w-10 rounded-full bg-blue-500 p-1" />
    </div>
    <div v-else>
      <span class="text-xl">Hello </span>
      <span class="font-bold">{{ authStore.user?.name }}</span
      >, you are logged in. Email to contact you:
      <span class="font-bold">{{ authStore.user?.email }}</span
      >, you role is: <span class="font-bold">{{ authStore.user?.role }}</span>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import Spinner from '@/components/Spinner.vue'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const syncProfile = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/profile`, getConfig(authStore.access_token))
    authStore.setUser(response.data.user)
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
