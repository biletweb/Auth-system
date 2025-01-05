<template>
  <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div>
      <p class="dark:text-slate-200">{{ $t('Users') }}</p>
      <Spinner v-if="loading" class="my-1 w-6 rounded-full bg-blue-500 p-1 dark:bg-indigo-500" />
      <p v-else class="text-2xl font-medium dark:text-sky-500">{{ totalUsers }}</p>
    </div>
  </div>
  <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div>
      <p class="dark:text-slate-200">{{ $t('Administrators') }}</p>
      <Spinner v-if="loading" class="my-1 w-6 rounded-full bg-blue-500 p-1 dark:bg-indigo-500" />
      <p v-else class="text-2xl font-medium dark:text-sky-500">{{ totalAdminUsers }}</p>
    </div>
  </div>
  <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div>
      <p class="dark:text-slate-200">{{ $t('Unconfirmed email addresses') }}</p>
      <Spinner v-if="loading" class="my-1 w-6 rounded-full bg-blue-500 p-1 dark:bg-indigo-500" />
      <div v-else class="flex items-center justify-between text-2xl font-medium dark:text-sky-500">
        {{ totalUnverifiedEmailUsers }}
        <span
          v-if="unverifiedEmailPercentage !== 0"
          class="rounded-lg bg-red-500 px-2 py-1 text-sm font-semibold text-white dark:bg-rose-500 dark:text-slate-200"
        >
          {{ unverifiedEmailPercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { i18n } from '@/main.js'
import Spinner from '@/components/Spinner.vue'

const totalUsers = ref(0)
const totalAdminUsers = ref(0)
const totalUnverifiedEmailUsers = ref(0)
const loading = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
const unverifiedEmailPercentage = ref(0)

const getStatistics = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard`, { ...getConfig(authStore.access_token) })
    totalUsers.value = response.data.totalUsers
    totalAdminUsers.value = response.data.totalAdminUsers
    totalUnverifiedEmailUsers.value = response.data.totalUnverifiedEmailUsers
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

onMounted(async () => {
  await getStatistics()
})

watch([totalUsers, totalAdminUsers, totalUnverifiedEmailUsers], () => {
  unverifiedEmailPercentage.value = Math.round((totalUnverifiedEmailUsers.value / totalUsers.value) * 100)
})
</script>
