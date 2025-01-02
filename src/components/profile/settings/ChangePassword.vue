<template>
  <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <span class="text-xl font-bold dark:text-slate-200">{{ $t('Changing account password') }}</span>
    <form @submit.prevent="changePassword">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative my-4">
          <label for="password" class="dark:text-slate-200">
            {{ $t('New password') }}<sup class="text-red-500 dark:text-rose-500">*</sup></label
          >
          <div class="absolute left-2.5 top-[34px] text-slate-400">
            <i class="pi pi-key"></i>
          </div>
          <input
            v-model="data.user.password"
            type="password"
            name="password"
            id="password"
            :placeholder="$t('New password')"
            class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
            :class="{
              'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'password',
              'border-red-500 dark:border-rose-500': errorField === 'password',
            }"
          />
        </div>
        <div class="relative my-4">
          <label for="password_confirmation" class="dark:text-slate-200">
            {{ $t('New password confirmation') }}<sup class="text-red-500 dark:text-rose-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[34px] text-slate-400">
            <i class="pi pi-key"></i>
          </div>
          <input
            v-model="data.user.password_confirmation"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            :placeholder="$t('New password confirmation')"
            class="w-full rounded-lg border p-2 pl-8 placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
            :class="{
              'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'password',
              'border-red-500 dark:border-rose-500': errorField === 'password',
            }"
          />
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          :disabled="data.loading"
        >
          <Spinner v-if="data.loading" class="w-6" />
          <span v-else>{{ $t('Change password') }}</span>
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
import { reactive, ref } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { i18n } from '@/main.js'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const errorField = ref('')
const data = reactive({
  loading: false,
  user: {
    password: '',
    password_confirmation: '',
  },
})

const changePassword = async () => {
  data.loading = true
  errorField.value = ''
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/settings/change-password`,
      data.user,
      getConfig(authStore.access_token),
    )
    if (response.data.error) {
      errorField.value = response.data.field
      toast.error(i18n.global.t(response.data.error), { timeout: 5000 })
    } else if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000 })
    } else {
      data.user.password = ''
      data.user.password_confirmation = ''
      toast.success(i18n.global.t(response.data.message), { timeout: 5000 })
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000 })
    } else {
      toast.error(i18n.global.t(error.message), { timeout: 5000 })
    }
  } finally {
    data.loading = false
  }
}
</script>
