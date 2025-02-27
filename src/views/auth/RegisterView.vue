<template>
  <div class="flex min-h-[calc(100vh-164px)] items-center justify-center">
    <div class="card sm:w-12/12 mx-auto rounded-lg border bg-white p-4 lg:w-6/12 dark:border-slate-600 dark:bg-slate-800">
      <span class="text-3xl font-bold dark:text-white">{{ $t('Register') }}</span>
      <form @submit.prevent="register">
        <div class="my-4 grid grid-cols-2 gap-4">
          <div class="relative">
            <label for="name" class="text-sm dark:text-slate-200">
              {{ $t('Name') }}<sup class="text-red-500 dark:text-rose-500">*</sup>
            </label>
            <div class="absolute left-2.5 top-[34px] text-slate-400"><i class="pi pi-user"></i></div>
            <input
              v-model="data.user.name"
              type="text"
              name="name"
              id="name"
              :placeholder="$t('Name')"
              class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
              :class="{
                'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'name',
                'border-red-500 dark:border-rose-500': errorField === 'name',
              }"
            />
          </div>
          <div class="relative">
            <label for="surname" class="text-sm dark:text-slate-200">
              {{ $t('Surname') }}<sup class="text-red-500 dark:text-rose-500">*</sup>
            </label>
            <div class="absolute left-2.5 top-[34px] text-slate-400"><i class="pi pi-user"></i></div>
            <input
              v-model="data.user.surname"
              type="text"
              name="surname"
              id="surname"
              :placeholder="$t('Surname')"
              class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
              :class="{
                'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'surname',
                'border-red-500 dark:border-rose-500': errorField === 'surname',
              }"
            />
          </div>
        </div>
        <div class="relative my-4">
          <label for="email" class="text-sm dark:text-slate-200">
            {{ $t('Email') }}<sup class="text-red-500 dark:text-rose-500">*</sup>
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
              'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'email',
              'border-red-500 dark:border-rose-500': errorField === 'email',
            }"
          />
        </div>
        <div class="my-4 grid grid-cols-2 gap-4">
          <div class="relative">
            <label for="password" class="text-sm dark:text-slate-200">
              {{ $t('Password') }}<sup class="text-red-500 dark:text-rose-500">*</sup>
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
                'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'password',
                'border-red-500 dark:border-rose-500': errorField === 'password',
              }"
            />
          </div>
          <div class="relative">
            <label for="password_confirmation" class="text-sm dark:text-slate-200">
              {{ $t('Password confirmation') }}<sup class="text-red-500 dark:text-rose-500">*</sup>
            </label>
            <div class="absolute left-2.5 top-[34px] text-slate-400"><i class="pi pi-key"></i></div>
            <input
              v-model="data.user.password_confirmation"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              :placeholder="$t('Password confirmation')"
              class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
              :class="{
                'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'password',
                'border-red-500 dark:border-rose-500': errorField === 'password',
              }"
            />
          </div>
        </div>
        <div class="my-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            :disabled="data.loading"
          >
            <Spinner v-if="data.loading" class="w-6" />
            <span v-else>{{ $t('Register') }}</span>
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
import { i18n } from '@/main.js'

const toast = useToast()
const router = useRouter()
const errorField = ref('')
const data = reactive({
  loading: false,
  user: {
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
})

const register = async () => {
  data.loading = true
  errorField.value = ''
  try {
    const response = await axios.post(`${BASE_URL}/register`, data.user)
    if (response.data.error) {
      errorField.value = response.data.field
      toast.error(i18n.global.t(response.data.error), { timeout: 5000 })
    } else {
      router.push({ name: 'login' })
      toast.success(i18n.global.t(response.data.message), { timeout: 5000 })
    }
  } catch (error) {
    toast.error(i18n.global.t(error.message), { timeout: 5000 })
  } finally {
    data.loading = false
  }
}
</script>
