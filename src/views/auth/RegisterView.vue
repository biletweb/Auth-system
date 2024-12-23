<template>
  <div class="min-h-[calc(100vh-160px)] flex items-center justify-center">
    <div class="card mx-auto w-6/12 rounded-lg border bg-white p-4">
      <h1 class="text-3xl font-bold">Register</h1>
      <form @submit.prevent="register">
        <div class="my-4">
          <label for="name">Name<span class="ms-1 text-red-500">*</span></label>
          <input
            v-model="data.user.name"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            class="w-full rounded-lg border p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

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
          <label for="password_confirmation"
            >Password confirmation<span class="ms-1 text-red-500">*</span></label
          >
          <input
            v-model="data.user.password_confirmation"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Password confirmation"
            class="w-full rounded-lg border p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div class="my-4">
          <div v-if="data.loading" class="flex justify-center">
            <Spinner class="w-10" />
          </div>
          <button
            v-else
            type="submit"
            class="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Register
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
