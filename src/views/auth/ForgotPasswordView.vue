<template>
  <div class="flex min-h-[calc(100vh-164px)] items-center justify-center">
    <div class="card sm:w-12/12 mx-auto rounded-lg border bg-white p-4 shadow lg:w-6/12">
      <span class="text-3xl font-bold">{{ $t('Forgot password?') }}</span>
      <form @submit.prevent="sendNewPassword">
        <div class="relative my-4">
          <label for="email">{{ $t('Email') }}<sup class="ms-1 text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[34px] text-gray-400"><i class="pi pi-at"></i></div>
          <input
            v-model="email"
            type="text"
            name="email"
            id="email"
            :placeholder="$t('Email')"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
            :class="{ 'border-red-500': errorField === 'email' }"
          />
          <p class="text-xs text-slate-500">{{ $t('Enter the email address you used when registering') }}</p>
        </div>
        <div class="my-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            :disabled="loading"
          >
            <Spinner v-if="loading" class="w-6" />
            <span v-else>{{ $t('Send new password') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Spinner from '@/components/Spinner.vue'
import axios from 'axios'
import { BASE_URL } from '@/helpers/config.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { i18n } from '@/main.js'

const toast = useToast()
const router = useRouter()
const errorField = ref('')
const loading = ref(false)
const email = ref('')

const sendNewPassword = async () => {
  loading.value = true
  errorField.value = ''
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email })
    router.push({ name: 'login' })
    toast.success(i18n.global.t(response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
  } catch (error) {
    if (error.response.status === 422) {
      errorField.value = error.response.data.field
      toast.error(i18n.global.t(error.response.data.error), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    loading.value = false
  }
}
</script>
