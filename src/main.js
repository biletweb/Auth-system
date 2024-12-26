import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

import App from './App.vue'
import router from './router'

import en from './locales/en.json'
import ru from './locales/ru.json'
import uk from './locales/uk.json'

const i18n = createI18n({
  locale: 'uk',
  fallbackLocale: 'en',
  messages: { en, ru, uk },
  globalInjection: true,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.use(i18n)

app.mount('#app')
