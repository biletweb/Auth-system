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

  <form @submit.prevent="userSearch">
    <div class="my-4 flex items-center gap-4">
      <div class="relative w-full">
        <div class="absolute left-2.5 top-2.5 text-gray-400"><i class="pi pi-search"></i></div>
        <input
          v-model="searchInput"
          ref="searchInputRef"
          type="text"
          name="searchInput"
          :placeholder="$t('Search users...')"
          class="w-full border border-slate-300 p-2 pl-8 pr-8 shadow focus:border-blue-500 focus:outline-none"
        />
        <div v-if="searchInput" class="absolute right-2.5 top-2.5 text-gray-400 hover:cursor-pointer hover:text-gray-500">
          <i v-tooltip="{ content: $t('Clear'), distance: 10 }" class="pi pi-eraser" @click="clearSearchInput"></i>
        </div>
      </div>
      <button
        type="submit"
        class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        :class="{ 'opacity-50': loadingUserSearch }"
        :disabled="loadingUserSearch"
      >
        {{ $t('Search') }}
      </button>
    </div>
  </form>

  <table class="w-full border-collapse border border-slate-400 bg-white text-sm shadow">
    <thead class="bg-slate-50">
      <tr>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Name') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Surname') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Email') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">
          <div class="flex items-center">
            {{ $t('Role') }}
            <div class="relative">
              <div>
                <i
                  @click="toggleUserRoleFilter"
                  class="pi pi-filter ms-1 cursor-pointer"
                  :class="{
                    'text-blue-500 transition duration-300 hover:text-blue-600': showUserRoleFilter,
                    'text-slate-500 transition duration-300 hover:text-slate-600': !showUserRoleFilter,
                  }"
                ></i>
              </div>
              <div
                v-if="showUserRoleFilter"
                v-on-click-outside="toggleUserRoleFilter"
                class="absolute start-1.5 top-4 z-10 mt-2 rounded-lg border border-gray-100 bg-white shadow"
              >
                <div class="p-2">
                  <button
                    @click="sortBy('all')"
                    type="button"
                    class="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-normal text-slate-500 hover:bg-gray-50 hover:text-slate-600"
                  >
                    {{ $t('All') }}
                  </button>
                  <button
                    @click="sortBy('admin')"
                    type="button"
                    class="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-normal text-red-500 hover:bg-gray-50 hover:text-red-600"
                  >
                    {{ $t('Administrator') }}<i class="pi pi-wrench ms-1"></i>
                  </button>
                  <button
                    @click="sortBy('user')"
                    type="button"
                    class="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-normal text-slate-500 hover:bg-gray-50 hover:text-slate-600"
                  >
                    {{ $t('User') }}<i class="pi pi-user ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Locale') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Registered') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Actions') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.name }}</td>
        <td class="border border-slate-300 p-4 text-slate-500">{{ user.surname }}</td>
        <td class="w-96 border border-slate-300 p-4 text-slate-500">
          <div class="flex items-center">
            {{ user.email }}
            <i
              v-if="user.email_verified_at"
              v-tooltip="{ content: $t('Verified'), distance: 10 }"
              class="pi pi-check-circle ms-1 text-green-500"
            ></i>
            <i
              v-else
              v-tooltip="{ content: $t('Not verified'), distance: 10 }"
              class="pi pi-times-circle ms-1 text-yellow-500"
            ></i>
          </div>
        </td>
        <td class="w-96 border border-slate-300 p-4 text-slate-500">
          <div v-if="user.role === 'admin'" class="flex items-center text-red-500">{{ $t('Administrator') }}</div>
          <div v-if="user.role === 'user'" class="flex items-center">{{ $t('User') }}</div>
        </td>
        <td class="border border-slate-300 p-4 uppercase text-slate-500">{{ user.locale }}</td>
        <td class="w-96 border border-slate-300 p-4 text-slate-500">{{ user.created_at }}</td>
        <td class="border border-slate-300 p-4 text-slate-500">
          <div v-if="user.role === 'admin'" class="flex items-center text-red-500">
            <Spinner v-if="loadingChangeUserRole && changeUserRoleId === user.id" class="w-5 rounded-full bg-blue-500 p-1" />
            <i
              v-else-if="user.id !== authStore.user.id"
              v-tooltip="{ content: $t('Assign as user'), distance: 10 }"
              @click="changeUserRole(user.id)"
              class="pi pi-user cursor-pointer text-slate-500 hover:text-slate-600"
            ></i>
            <i
              v-else-if="user.id === authStore.user.id"
              v-tooltip="{ content: $t('Not allowed'), distance: 10 }"
              class="pi pi-minus text-slate-500 transition duration-300 hover:text-slate-600"
            ></i>
          </div>
          <div v-if="user.role === 'user'" class="flex items-center">
            <Spinner v-if="loadingChangeUserRole && changeUserRoleId === user.id" class="w-5 rounded-full bg-blue-500 p-1" />
            <i
              v-else
              @click="changeUserRole(user.id)"
              v-tooltip="{ content: $t('Assign as administrator'), distance: 10 }"
              class="pi pi-wrench cursor-pointer text-red-500 opacity-75 transition duration-300 hover:text-red-600"
            ></i>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="mt-4 text-center">
    <button
      v-if="!loading && hasMore && !sortByValue"
      @click="getUsers"
      type="submit"
      class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 disabled:bg-gray-300"
      :disabled="loading"
    >
      {{ $t('Load more') }}
    </button>
    <button
      v-if="!loadingSortBy && sortByHasMore && sortByValue && users.length > 0"
      @click="getSortedUsers"
      type="submit"
      class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 disabled:bg-gray-300"
      :disabled="loadingSortBy"
    >
      {{ $t('Load more') }}
    </button>
  </div>
  <div v-if="loading || loadingUserSearch || loadingSortBy" class="my-4 flex justify-center">
    <Spinner class="w-10 rounded-full bg-blue-500 p-1" />
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
import { vOnClickOutside } from '@vueuse/components'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const loading = ref(false)
const loadingUserSearch = ref(false)
const loadingChangeUserRole = ref(false)
const loadingSortBy = ref(false)
const users = ref([])
const changeUserRoleId = ref(null)
const searchInput = ref('')
const searchInputRef = ref(null)
const errorField = ref('')
const offset = ref(0) // Текущий сдвиг
const limit = 10 // Количество пользователей за раз
const hasMore = ref(true) // Флаг для проверки, есть ли еще данные для загрузки
const sortByOffset = ref(0)
const sortByLimit = 10
const sortByHasMore = ref(true)
const sortByValue = ref(null)
const showUserRoleFilter = ref(false)

onMounted(() => {
  getUsers()
})

const getUsers = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`, {
      params: { offset: offset.value, limit },
      ...getConfig(authStore.access_token),
    })
    if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000, pauseOnFocusLoss: true })
    } else {
      users.value = [...users.value, ...response.data.users]
      offset.value += limit // Обновляем смещение
      if (response.data.users.length < limit) {
        hasMore.value = false // Если загружено меньше, чем лимит, значит, больше нет данных
      }
    }
  } catch (error) {
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    loading.value = false
  }
}

const userSearch = async () => {
  if (searchInput.value !== '' && searchInput.value.length >= 3) {
    loadingUserSearch.value = true
    users.value = []
    offset.value = 0
    sortByOffset.value = 0
    hasMore.value = false
    sortByHasMore.value = false
  }
  try {
    const response = await axios.get(`${BASE_URL}/admin/users/search`, {
      params: { search: searchInput.value },
      ...getConfig(authStore.access_token),
    })
    if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000, pauseOnFocusLoss: true })
    } else if (response.data.users.length === 0) {
      toast.warning(i18n.global.t('No users found.'), { timeout: 5000, pauseOnFocusLoss: true })
    } else {
      users.value = response.data.users
      toast.success(i18n.global.t('Users found:', { count: response.data.users.length }), {
        timeout: 5000,
        pauseOnFocusLoss: true,
      })
    }
  } catch (error) {
    if (error.response.status === 422) {
      errorField.value = error.response.data.field
      toast.error(i18n.global.t(error.response.data.error), { timeout: 5000, pauseOnFocusLoss: true })
    }
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    loadingUserSearch.value = false
  }
}

const clearSearchInput = () => {
  searchInput.value = ''
  users.value = []
  offset.value = 0
  sortByOffset.value = 0
  hasMore.value = true
  sortByHasMore.value = true
  getUsers()
  searchInputRef.value?.focus()
}

const changeUserRole = async (userId) => {
  loadingChangeUserRole.value = true
  changeUserRoleId.value = userId
  try {
    const response = await axios.post(`${BASE_URL}/admin/users/change/role`, { id: userId }, getConfig(authStore.access_token))
    if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000, pauseOnFocusLoss: true })
    } else {
      const updatedUser = response.data.user
      // Ищем пользователя в локальном списке и обновляем его данные
      const index = users.value.findIndex((user) => user.id === userId)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updatedUser }
      }
      toast.success(i18n.global.t(response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } catch (error) {
    if (error.response.status === 422) {
      errorField.value = error.response.data.field
      toast.error(i18n.global.t(error.response.data.error), { timeout: 5000, pauseOnFocusLoss: true })
    }
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
    if (error.response.status === 429) {
      toast.error(i18n.global.t('Too many requests. Please try again later.'), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    changeUserRoleId.value = null
    loadingChangeUserRole.value = false
  }
}

const toggleUserRoleFilter = () => {
  showUserRoleFilter.value = !showUserRoleFilter.value
}

const sortBy = async (value) => {
  sortByValue.value = value
  searchInput.value = ''
  showUserRoleFilter.value = false
  sortByOffset.value = 0
  sortByHasMore.value = true
  users.value = []
  await getSortedUsers()
}

const getSortedUsers = async () => {
  loadingSortBy.value = true
  try {
    const response = await axios.get(`${BASE_URL}/admin/users/sort-by`, {
      params: { sort_by: sortByValue.value, sortByOffset: sortByOffset.value, sortByLimit },
      ...getConfig(authStore.access_token),
    })
    if (response.data.warning) {
      toast.warning(i18n.global.t(response.data.warning), { timeout: 5000, pauseOnFocusLoss: true })
    } else {
      users.value = [...users.value, ...response.data.users] // Обновляем список пользователей
      sortByOffset.value += sortByLimit // Обновляем смещение
      if (response.data.users.length < sortByLimit) {
        sortByHasMore.value = false // Если загружено меньше, чем лимит, значит, больше нет данных
      }
    }
  } catch (error) {
    if (error.response.status === 422) {
      errorField.value = error.response.data.field
      toast.error(i18n.global.t(error.response.data.error), { timeout: 5000, pauseOnFocusLoss: true })
    }
    if (error.response.status === 401) {
      authStore.clearState()
      router.push({ name: 'login' })
      toast.error(i18n.global.t(error.response.data.message), { timeout: 5000, pauseOnFocusLoss: true })
    }
  } finally {
    loadingSortBy.value = false
  }
}
</script>
