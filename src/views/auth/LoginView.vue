<template>
  <div class="flex min-h-[calc(100vh-160px)] items-center justify-center">
    <div class="card sm:w-12/12 mx-auto rounded-lg border bg-white p-4 lg:w-6/12">
      <h1 class="text-3xl font-bold">Login</h1>
      <form @submit.prevent="login">
        <div class="my-4">
          <label for="email">Email<span class="ms-1 text-red-500">*</span></label>
          <input
            v-model="data.user.email"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            class="w-full rounded-lg border p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="my-4">
          <label for="password">Password<span class="ms-1 text-red-500">*</span></label>
          <input
            v-model="data.user.password"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="w-full rounded-lg border p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="my-4">
          <button
            type="submit"
            class="flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            :disabled="data.loading"
          >
            <Spinner v-if="data.loading" class="w-6" />
            <span v-else>Login</span>
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
import { useAuthStore } from '@/stores/authStore.js'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

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
  try {
    const response = await axios.post(`${BASE_URL}/login`, data.user)
    if (response.data.error) {
      toast.error(response.data.error, { timeout: 5000 })
    } else {
      authStore.setAccessToken(response.data.access_token)
      authStore.setUser(response.data.user)
      toast.success(response.data.message, { timeout: 5000 })
      router.push({ name: 'home' })
    }
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
