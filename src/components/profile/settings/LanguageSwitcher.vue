<template>
  <div class="card rounded-lg bg-white p-4">
    <span class="text-xl font-bold">{{ $t('Changing your language') }}</span>

    <div class="my-7 flex gap-2">
      <button type="submit" @click="setLocale('uk')" :disabled="savedLocale === 'uk'">
        <span
          class="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          :class="{ 'underline underline-offset-4': savedLocale === 'uk' }"
        >
          {{ $t('UK') }}
        </span>
      </button>
      <button type="submit" @click="setLocale('ru')" :disabled="savedLocale === 'ru'">
        <span
          class="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          :class="{ 'underline underline-offset-4': savedLocale === 'ru' }"
        >
          {{ $t('RU') }}
        </span>
      </button>
      <button type="submit" @click="setLocale('en')" :disabled="savedLocale === 'en'">
        <span
          class="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
          :class="{ 'underline underline-offset-4': savedLocale === 'en' }"
        >
          {{ $t('EN') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const savedLocale = ref('')

onMounted(() => {
  savedLocale.value = localStorage.getItem('locale')
})

const setLocale = (newLocale) => {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

watch(locale, (newValue) => {
  savedLocale.value = newValue
})
</script>
