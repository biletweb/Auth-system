<template>
  <div class="flex min-h-[calc(100vh-160px)] items-center justify-center">
    <div class="card sm:w-12/12 mx-auto rounded-lg border bg-white p-4 shadow lg:w-6/12">
      <span class="text-3xl font-bold">{{ $t('Register') }}</span>
      <form @submit.prevent="register">
        <div class="my-4 grid grid-cols-2 gap-4">
          <div class="relative">
            <label for="name">{{ $t('Name') }}<sup class="ms-1 text-red-500">*</sup></label>
            <div class="absolute left-2.5 top-[34px] text-gray-400">
              <i class="pi pi-user"></i>
            </div>
            <input
              v-model="data.user.name"
              type="text"
              name="name"
              id="name"
              :placeholder="$t('Name')"
              class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div class="relative">
            <label for="surname">{{ $t('Surname') }}<sup class="ms-1 text-red-500">*</sup></label>
            <div class="absolute left-2.5 top-[34px] text-gray-400">
              <i class="pi pi-user"></i>
            </div>
            <input
              v-model="data.user.surname"
              type="text"
              name="surname"
              id="surname"
              :placeholder="$t('Surname')"
              class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div class="relative my-4">
          <label for="email">{{ $t('Email') }}<sup class="ms-1 text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-at"></i>
          </div>
          <input
            v-model="data.user.email"
            type="text"
            name="email"
            id="email"
            :placeholder="$t('Email')"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="relative my-4">
          <label for="password">{{ $t('Password') }}<sup class="ms-1 text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-key"></i>
          </div>
          <input
            v-model="data.user.password"
            type="password"
            name="password"
            id="password"
            :placeholder="$t('Password')"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="relative my-4">
          <label for="password_confirmation">
            {{ $t('Password confirmation') }}<sup class="ms-1 text-red-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-key"></i>
          </div>
          <input
            v-model="data.user.password_confirmation"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            :placeholder="$t('Password confirmation')"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="my-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
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
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { BASE_URL } from '@/helpers/config.js'
import { useToast } from 'vue-toastification'
import Spinner from '@/components/Spinner.vue'

const toast = useToast()
const router = useRouter()

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
  try {
    const response = await axios.post(`${BASE_URL}/register`, data.user)
    toast.success(response.data.message, {
      timeout: 5000,
    })
    router.push({ name: 'login' })
  } catch (error) {
    if (error.response.status === 422) {
      const errors = error.response.data.errors
      let errorMessage = ''
      errorMessage = Object.values(errors).flat().join('\n')
      toast.error(errorMessage, { timeout: 5000 })
    }
  } finally {
    data.loading = false
  }
}
</script>
