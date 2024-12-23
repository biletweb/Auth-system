<template>
  <header class="rounded-b-lg bg-blue-500 p-4 text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div>
          <HeaderLogo />
        </div>
        <div>
          <HeaderLeftMenuItem />
        </div>
      </div>
      <Spinner v-if="loading" class="w-5" />
      <div v-else>
        <HeaderRightMenuItem />
      </div>
    </div>
  </header>
</template>

<script setup>
import HeaderLogo from '@/components/HeaderLogo.vue'
import HeaderRightMenuItem from '@/components/HeaderRightMenuItem.vue'
import HeaderLeftMenuItem from '@/components/HeaderLeftMenuItem.vue'
import { useAuthStore } from '@/stores/authStore.js'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useToast } from 'vue-toastification'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/Spinner.vue'

const loading = ref(false)

onMounted(async () => {
  if (authStore.access_token) {
    loading.value = true
    await fetchLoggedInUser()
    loading.value = false
  }
})

const authStore = useAuthStore()
const toast = useToast()
const fetchLoggedInUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, getConfig(authStore.access_token))
    authStore.setUser(response.data.user)
  } catch (error) {
    if (error.response.status === 401) {
      authStore.clearState()
      toast.error(error.response.data.message, { timeout: 5000 })
    }
  }
}
</script>
