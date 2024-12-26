<template>
  <div class="card rounded-lg bg-white p-4">
    <span class="text-xl font-bold">{{ $t('Updating personal information') }}</span>
    <div v-if="!authStore.user" class="my-4 flex justify-center">
      <Spinner class="w-10 rounded-full bg-blue-500 p-1" />
    </div>
    <form v-else @submit.prevent="update">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative my-4">
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
        <div class="relative my-4">
          <label for="surname">{{ $t('Surname') }}<sup class="ms-1 text-red-500">*</sup> </label>
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
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          :disabled="data.loading"
        >
          <Spinner v-if="data.loading" class="w-6" />
          <span v-else>{{ $t('Update information') }}</span>
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
import { watch, reactive } from 'vue'
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

watch(
  () => authStore.user,
  (newValue) => {
    if (newValue) {
      data.user.name = newValue.name
      data.user.surname = newValue.surname
    }
  },
  { immediate: true },
)

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
    } else if (response.data.warning) {
      toast.warning(response.data.warning, { timeout: 5000 })
    } else {
      toast.success(response.data.message, { timeout: 5000 })
      authStore.user.name = data.user.name
      authStore.user.surname = data.user.surname
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
