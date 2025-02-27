<template>
  <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <span class="text-xl font-bold text-red-500 dark:text-rose-500">{{ $t('Deleting an account') }}</span>
    <div class="my-4 font-semibold dark:text-slate-400">
      {{
        $t('If you delete your account, all your personal information will be deleted and you will not be able to regain access.')
      }}
    </div>
    <div class="flex justify-end">
      <button
        @click="deleteAccount"
        type="button"
        class="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600 dark:bg-rose-500 dark:hover:bg-rose-400"
        :disabled="loading"
      >
        <Spinner v-if="loading" class="w-6" />
        <span v-else>{{ $t('Delete account') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/main.js'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const { locale } = useI18n()

const deleteAccount = async () => {
  loading.value = true
  try {
    const response = await axios.post(`${BASE_URL}/profile/settings/delete-account`, null, getConfig(authStore.access_token))
    if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000 })
    } else {
      authStore.clearState()
      locale.value = 'uk'
      router.push({ name: 'login' })
      toast.success(i18n.global.t(response.data.message), { timeout: 5000 })
    }
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
