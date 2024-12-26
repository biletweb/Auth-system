<template>
  <div class="card rounded-lg bg-white p-4">
    <span class="text-xl font-bold text-red-500">{{ $t('Deleting an account') }}</span>
    <p class="my-4 font-bold">
      {{
        $t(
          'If you delete your account, all your personal data will be deleted and you will not be able to regain access.',
        )
      }}
    </p>
    <div class="flex justify-end">
      <button
        @click="deleteAccount"
        type="button"
        class="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
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

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const { locale } = useI18n()

const deleteAccount = async () => {
  loading.value = true
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/settings/delete-account`,
      null,
      getConfig(authStore.access_token),
    )
    if (response.data.error) {
      toast.error(response.data.error, { timeout: 5000 })
    } else if (response.data.warning) {
      toast.warning(response.data.warning, { timeout: 5000 })
    } else {
      authStore.clearState()
      locale.value = 'uk'
      router.push({ name: 'login' })
      toast.success(response.data.message, { timeout: 5000 })
    }
  } catch (error) {
    const errors = error.response.data.errors
    let errorMessage = ''
    errorMessage = Object.values(errors).flat().join('\n')
    toast.error(errorMessage, { timeout: 5000 })
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
