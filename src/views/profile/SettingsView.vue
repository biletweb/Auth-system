<template>
  <div class="mb-4 flex items-center justify-between">
    <span class="text-3xl font-bold dark:text-white">{{ $t('Settings') }}</span>
    <Spinner v-if="!authStore.user" class="w-7 rounded-full bg-blue-500 p-1 dark:bg-indigo-500" />
    <span v-else class="text-xl font-semibold dark:text-slate-400">{{ authStore.user.email }}</span>
  </div>
  <div
    v-if="authStore.user && !authStore.user.email_verified_at && authStore.user.email !== 'test@example.com'"
    class="my-4 rounded-lg border bg-amber-300 p-4 shadow dark:border-slate-600 dark:bg-slate-800"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center text-blue-500 dark:text-amber-300">
        <i class="pi pi-info-circle me-2" style="font-size: 1.5rem"></i>
        {{ $t('Please confirm your email. We have sent a verification code to the address you provided.') }}
      </div>
      <div>
        <button
          @click="resendEmail"
          type="submit"
          class="font-semibold text-blue-500 transition duration-300 hover:text-blue-600 hover:underline hover:underline-offset-4 dark:text-amber-300 dark:hover:text-amber-200"
          :disabled="loadingResendEmail"
        >
          <Spinner v-if="loadingResendEmail" class="flex w-5 items-center rounded-full bg-blue-500 p-1 dark:bg-indigo-500" />
          <span v-else>{{ $t('Resend verification code') }}</span>
        </button>
      </div>
    </div>
    <form @submit.prevent="confirmEmail">
      <div class="mt-4 flex items-center gap-4">
        <div>
          <input
            v-model="verificationCode"
            type="text"
            name="verificationCode"
            :placeholder="$t('Verification code')"
            class="w-44 rounded-lg border p-2 font-normal placeholder:text-slate-400 focus:outline-none dark:bg-slate-800 dark:text-slate-400"
            :class="{
              'focus:border-blue-500 dark:border-slate-600 dark:focus:border-indigo-500': errorField !== 'verification_code',
              'border-red-500 dark:border-rose-500': errorField === 'verification_code',
            }"
          />
        </div>
        <div class="align-bottom">
          <button
            type="submit"
            class="rounded-lg bg-blue-500 px-4 py-2 font-normal text-white transition duration-300 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            :disabled="loadingConfirmEmail"
          >
            <Spinner v-if="loadingConfirmEmail" class="w-6" />
            <span v-else>{{ $t('Confirm') }}</span>
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <UpdatePersonalInfo class="shadow" />
    <ChangePassword class="shadow" />
    <LanguageSwitch class="shadow" />
    <DeleteAccount class="shadow" />
  </div>
</template>

<script setup>
import ChangePassword from '@/components/profile/settings/ChangePassword.vue'
import UpdatePersonalInfo from '@/components/profile/settings/UpdatePersonalInfo.vue'
import LanguageSwitch from '@/components/profile/settings/LanguageSwitch.vue'
import DeleteAccount from '@/components/profile/settings/DeleteAccount.vue'
import Spinner from '@/components/Spinner.vue'
import { useAuthStore } from '@/stores/authStore.js'
import { ref } from 'vue'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { i18n } from '@/main.js'

const authStore = useAuthStore()
const verificationCode = ref('')
const loadingConfirmEmail = ref(false)
const loadingResendEmail = ref(false)
const toast = useToast()
const router = useRouter()
const errorField = ref('')

const confirmEmail = async () => {
  loadingConfirmEmail.value = true
  errorField.value = ''
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/settings/confirm-email`,
      { verification_code: verificationCode.value },
      getConfig(authStore.access_token),
    )
    if (response.data.error) {
      errorField.value = response.data.field
      toast.error(i18n.global.t(response.data.error), { timeout: 5000 })
    } else {
      authStore.user.email_verified_at = true
      verificationCode.value = ''
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
    loadingConfirmEmail.value = false
  }
}

const resendEmail = async () => {
  loadingResendEmail.value = true
  try {
    const response = await axios.post(`${BASE_URL}/profile/settings/resend-email`, null, getConfig(authStore.access_token))
    if (response.data.error) {
      errorField.value = response.data.field
      toast.error(i18n.global.t(response.data.error), { timeout: 5000 })
    } else {
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
    loadingResendEmail.value = false
  }
}
</script>
