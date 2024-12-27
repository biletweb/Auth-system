<template>
  <div v-if="authStore.user?.role === 'admin'">
    <router-link
      :to="{ name: 'admin' }"
      class="flex items-center font-bold text-red-500 transition duration-300 hover:text-red-600"
    >
      <i class="pi pi-wrench me-1"></i>{{ $t('Administration panel') }}
    </router-link>
  </div>
  <div>
    <router-link
      :to="{ name: 'profile.settings' }"
      class="flex items-center font-bold text-blue-500 transition duration-300 hover:text-blue-600"
    >
      <i class="pi pi-cog me-1"></i>{{ $t('Settings') }}
    </router-link>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
const authStore = useAuthStore()
</script>
