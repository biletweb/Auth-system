<template>
  <div class="mb-4 flex items-center justify-between">
    <span class="text-3xl font-bold">{{ $t('Settings') }}</span>
    <Spinner v-if="!authStore.user" class="w-7 rounded-full bg-blue-500 p-1" />
    <span v-else class="text-xl font-bold">{{ authStore.user.email }}</span>
  </div>
  <div v-if="authStore.user && !authStore.user.email_verified_at" class="my-4 rounded-lg bg-amber-300 p-4 shadow">
    <div class="flex items-center justify-between">
      <div class="flex items-center text-blue-500">
        <i class="pi pi-info-circle me-2" style="font-size: 1.5rem"></i>
        {{ $t('Please confirm your email. We have sent a verification code to the address you provided.') }}
      </div>
      <div>
        <button
          @click="resendEmail"
          type="submit"
          class="font-bold text-blue-500 underline transition duration-300 hover:text-blue-600"
          :disabled="loadingResend"
        >
          <Spinner v-if="loadingResend" class="flex w-5 items-center rounded-full bg-blue-500 p-1" />
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
            class="w-44 rounded-lg border p-2 font-normal focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="align-bottom">
          <button
            type="submit"
            class="rounded-lg bg-blue-500 px-4 py-2 font-normal text-white transition duration-300 hover:bg-blue-600"
            :disabled="loadingConfirm"
          >
            <Spinner v-if="loadingConfirm" class="w-6" />
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
const loadingConfirm = ref(false)
const loadingResend = ref(false)
const toast = useToast()
const router = useRouter()

const confirmEmail = async () => {
  loadingConfirm.value = true
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/settings/confirm-email`,
      { verification_code: verificationCode.value },
      getConfig(authStore.access_token),
    )
    if (response.data.error) {
      toast.error(i18n.global.t(response.data.error), { timeout: 5000, pauseOnFocusLoss: true })
    } else if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000, pauseOnFocusLoss: true })
    } else {
      authStore.user.email_verified_at = true
      verificationCode.value = ''
      toast.success(i18n.global.t(response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } catch (error) {
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
    if (error.response.status === 429) {
      toast.error(i18n.global.t('Too many requests. Please try again later.'), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    loadingConfirm.value = false
  }
}

const resendEmail = async () => {
  loadingResend.value = true
  try {
    const response = await axios.post(`${BASE_URL}/profile/settings/resend-email`, null, getConfig(authStore.access_token))
    toast.success(i18n.global.t(response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
  } catch (error) {
    if (error.response.status === 429) {
      toast.error(i18n.global.t('Too many requests. Please try again later.'), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    loadingResend.value = false
  }
}
</script>
