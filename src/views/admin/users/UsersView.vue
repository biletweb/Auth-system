<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold">{{ $t('Users') }}</span>
    </div>
    <div class="flex items-center">
      <router-link
        :to="{ name: 'admin' }"
        class="flex items-center font-bold text-blue-500 transition duration-300 hover:text-blue-600"
      >
        <i class="pi pi-step-backward me-1"></i>{{ $t('Menu') }}
      </router-link>
    </div>
  </div>

  <table class="w-full border-collapse overflow-hidden rounded-lg border border-slate-400 bg-white text-sm shadow">
    <thead class="bg-slate-50">
      <tr>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Name') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Surname') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Email') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Role') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Locale') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Registered') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.name }}</td>
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.surname }}</td>
        <td class="border border-slate-300 p-4 text-slate-500">
          <p class="flex items-center">{{ user.email }} <i class="pi pi-check-circle ms-1 text-green-500"></i></p>
        </td>
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.role }}</td>
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.locale }}</td>
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.created_at }}</td>
      </tr>
    </tbody>
  </table>
  <div class="my-4 flex justify-center">
    <Spinner v-if="loading" class="w-10 rounded-full bg-blue-500 p-1 text-white" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useToast } from 'vue-toastification'
import { i18n } from '@/main.js'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const loading = ref(false)
const users = ref([])

onMounted(() => {
  fetchUser()
})

const fetchUser = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`, getConfig(authStore.access_token))
    if (response.data.warning) {
      toast.error(i18n.global.t(response.data.warning), { timeout: 5000 })
    } else {
      users.value = response.data.users
    }
  } catch (error) {
    if (error.response.status === 422) {
      toast.error(i18n.global.t(error.response.data.error), { timeout: 5000 })
    }
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000 })
    }
  } finally {
    loading.value = false
  }
}
</script>
