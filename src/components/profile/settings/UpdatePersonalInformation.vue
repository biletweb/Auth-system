<template>
  <div class="card rounded-lg bg-white p-4 my-4">
    <span class="text-xl font-bold">Update personal information</span>
    <form @submit.prevent="update">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative my-4">
          <label for="name">New name<sup class="ms-1 text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-user"></i>
          </div>
          <input
            v-model="data.user.name"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="relative my-4">
          <label for="surname">
            New surname<sup class="ms-1 text-red-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-user"></i>
          </div>
          <input
            v-model="data.user.surname"
            type="text"
            name="surname"
            id="surname"
            placeholder="Surname"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          :disabled="data.loading"
        >
          <Spinner v-if="data.loading" class="w-6" />
          <span v-else>Update information</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import Spinner from '@/components/Spinner.vue'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const data = reactive({
  loading: false,
  user: {
    name: '',
    surname: '',
  },
})

const update = async () => {
  data.loading = true
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/settings/update-personal-info`,
      data.user,
      getConfig(authStore.access_token),
    )
    if (response.data.error) {
      toast.error(response.data.error, { timeout: 5000 })
    } else {
      toast.success(response.data.message, { timeout: 5000 })
      data.user.password = ''
      data.user.password_confirmation = ''
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
    data.loading = false
  }
}
</script>
