<template>
  <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div class="flex items-center justify-between">
      <span class="text-xl font-bold dark:text-slate-200">{{ $t('Changing language') }}</span>
      <Spinner v-if="loading" class="w-7 rounded-full bg-blue-500 p-1 dark:bg-indigo-500" />
    </div>
    <div class="my-6 flex gap-2">
      <button
        v-tooltip="{ content: $t('Ukranian'), distance: 10, delay: { show: 2000, hide: 100 } }"
        type="submit"
        @click="setLocale('uk')"
        :disabled="savedLocale === 'uk'"
      >
        <div
          class="rounded-lg p-2 text-white transition duration-300"
          :class="{
            'bg-blue-600 underline underline-offset-4 dark:bg-indigo-400': savedLocale === 'uk',
            'bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400': savedLocale !== 'uk',
          }"
        >
          UK
        </div>
      </button>
      <button
        v-tooltip="{ content: $t('Russian'), distance: 10, delay: { show: 2000, hide: 100 } }"
        type="submit"
        @click="setLocale('ru')"
        :disabled="savedLocale === 'ru'"
      >
        <div
          class="rounded-lg p-2 text-white transition duration-300"
          :class="{
            'bg-blue-600 underline underline-offset-4 dark:bg-indigo-400': savedLocale === 'ru',
            'bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400': savedLocale !== 'ru',
          }"
        >
          RU
        </div>
      </button>
      <button
        v-tooltip="{ content: $t('English'), distance: 10, delay: { show: 2000, hide: 100 } }"
        type="submit"
        @click="setLocale('en')"
        :disabled="savedLocale === 'en'"
      >
        <div
          class="rounded-lg p-2 text-white transition duration-300"
          :class="{
            'bg-blue-600 underline underline-offset-4 dark:bg-indigo-400': savedLocale === 'en',
            'bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-400': savedLocale !== 'en',
          }"
        >
          EN
        </div>
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
    authStore.user.locale = newLocale
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
    toast.success(i18n.global.t(response.data.message), { timeout: 5000 })
  } catch (error) {
    if (error.response && error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000 })
    } else {
      toast.error(i18n.global.t(error.message), { timeout: 5000 })
    }
  } finally {
    loading.value = false
  }
}

watch(locale, (newValue) => {
  savedLocale.value = newValue
})
</script>
