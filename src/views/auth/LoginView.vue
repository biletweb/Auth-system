<template>
  <div class="flex min-h-[calc(100vh-164px)] items-center justify-center">
    <div class="card sm:w-12/12 mx-auto rounded-lg border bg-white p-4 shadow lg:w-6/12 dark:border-slate-600 dark:bg-slate-800">
      <span class="text-3xl font-bold dark:text-white">{{ $t('Login') }}</span>
      <form @submit.prevent="login">
        <div class="relative my-4">
          <label for="email" class="dark:text-slate-200">
            {{ $t('Email') }}<sup class="ms-1 text-red-500 dark:text-rose-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[34px] text-slate-400"><i class="pi pi-at"></i></div>
          <input
            v-model="data.user.email"
            type="text"
            name="email"
            id="email"
            :placeholder="$t('Email')"
            class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
            :class="{
              'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500':
                errorField !== 'email' || errorField !== 'email, password',
              'border-red-500 dark:border-rose-500': errorField === 'email' || errorField === 'email, password',
            }"
          />
        </div>
        <div class="relative my-4">
          <label for="password" class="dark:text-slate-200">
            {{ $t('Password') }}<sup class="ms-1 text-red-500 dark:text-rose-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[34px] text-slate-400"><i class="pi pi-key"></i></div>
          <input
            v-model="data.user.password"
            type="password"
            name="password"
            id="password"
            :placeholder="$t('Password')"
            class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
            :class="{
              'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500':
                errorField !== 'password' || errorField !== 'email, password',
              'border-red-500 dark:border-rose-500': errorField === 'password' || errorField === 'email, password',
            }"
          />
        </div>
        <div class="my-4 flex justify-end">
          <router-link
            :to="{ name: 'login.forgot-password' }"
            class="font-semibold text-blue-500 transition duration-300 hover:text-blue-600 hover:underline hover:underline-offset-4 dark:text-indigo-500 dark:hover:text-indigo-400"
          >
            {{ $t('Forgot password?') }}
          </router-link>
        </div>
        <div class="my-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            :disabled="data.loading"
          >
            <Spinner v-if="data.loading" class="w-6" />
            <span v-else>{{ $t('Login') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { BASE_URL } from '@/helpers/config.js'
import { useToast } from 'vue-toastification'
import Spinner from '@/components/Spinner.vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/main.js'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const { locale } = useI18n()
const errorField = ref('')
const data = reactive({
  loading: false,
  user: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
})

const login = async () => {
  data.loading = true
  errorField.value = ''
  try {
    const response = await axios.post(`${BASE_URL}/login`, data.user)
    if (response.data.error) {
      errorField.value = response.data.field
      toast.error(i18n.global.t(response.data.error), { timeout: 5000 })
    } else {
      authStore.setAccessToken(response.data.access_token)
      authStore.setUser(response.data.user)
      localStorage.setItem('locale', authStore.user.locale)
      locale.value = localStorage.getItem('locale')
      router.push({ name: 'home' })
      toast.success(i18n.global.t(response.data.message), { timeout: 5000 })
    }
  } catch (error) {
    toast.error(i18n.global.t(error.message), { timeout: 5000 })
  } finally {
    data.loading = false
  }
}
</script>
