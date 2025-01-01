<template>
  <header class="rounded-b-lg bg-blue-500 p-4 dark:bg-slate-800">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div><HeaderLogo /></div>
        <div><HeaderLeftMenuItems /></div>
      </div>
      <Spinner v-if="loading" class="w-5" />
      <div v-else><HeaderRightMenuItems /></div>
    </div>
  </header>
</template>

<script setup>
import HeaderLogo from '@/components/HeaderLogo.vue'
import HeaderRightMenuItems from '@/components/HeaderRightMenuItems.vue'
import HeaderLeftMenuItems from '@/components/HeaderLeftMenuItems.vue'
import { useAuthStore } from '@/stores/authStore.js'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useToast } from 'vue-toastification'
import { onMounted, ref } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { useRouter } from 'vue-router'
import { i18n } from '@/main.js'

const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

onMounted(async () => {
  if (authStore.access_token) {
    loading.value = true
    await fetchLoggedInUser()
    loading.value = false
  }
})

const fetchLoggedInUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, getConfig(authStore.access_token))
    authStore.setUser(response.data.user)
  } catch (error) {
    if (error.response && error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000 })
    } else {
      toast.error(i18n.global.t(error.message), { timeout: 5000 })
    }
  }
}
</script>
