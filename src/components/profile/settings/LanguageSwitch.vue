<template>
  <div class="card rounded-lg bg-white p-4">
    <div class="flex items-center justify-between">
      <span class="text-xl font-bold">{{ $t('Changing language') }}</span>
      <Spinner v-if="loading" class="w-7 rounded-full bg-blue-500 p-1" />
    </div>
    <div class="my-7 flex gap-2">
      <button type="submit" @click="setLocale('uk')" :disabled="savedLocale === 'uk'">
        <span
          class="rounded-lg p-2 text-white"
          :class="{
            'bg-blue-600 underline underline-offset-4': savedLocale === 'uk',
            'bg-blue-500 transition duration-300 hover:bg-blue-600': savedLocale !== 'uk',
          }"
        >
          UK
        </span>
      </button>
      <button type="submit" @click="setLocale('ru')" :disabled="savedLocale === 'ru'">
        <span
          class="rounded-lg p-2 text-white"
          :class="{
            'bg-blue-600 underline underline-offset-4': savedLocale === 'ru',
            'bg-blue-500 transition duration-300 hover:bg-blue-600': savedLocale !== 'ru',
          }"
        >
          RU
        </span>
      </button>
      <button type="submit" @click="setLocale('en')" :disabled="savedLocale === 'en'">
        <span
          class="rounded-lg p-2 text-white"
          :class="{
            'bg-blue-600 underline underline-offset-4': savedLocale === 'en',
            'bg-blue-500 transition duration-300 hover:bg-blue-600': savedLocale !== 'en',
          }"
        >
          EN
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { BASE_URL, getConfig } from '@/helpers/config.js'
import { useAuthStore } from '@/stores/authStore.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'
import { i18n } from '@/main.js'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const { locale } = useI18n()
const savedLocale = ref('')
const loading = ref(false)

onMounted(() => {
  savedLocale.value = localStorage.getItem('locale')
})

const setLocale = async (newLocale) => {
  loading.value = true
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/settings/change-locale`,
      { locale: newLocale },
      getConfig(authStore.access_token),
    )
    if (response.data.error) {
      toast.error(i18n.global.t(response.data.error), { timeout: 5000, pauseOnFocusLoss: true })
    } else {
      authStore.user.locale = newLocale
      locale.value = newLocale
      localStorage.setItem('locale', newLocale)
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
    loading.value = false
  }
}

watch(locale, (newValue) => {
  savedLocale.value = newValue
})
</script>
