<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold">Profile</span>
    </div>
    <div class="flex items-center gap-4">
      <div v-if="authStore.user?.role === 'admin'">
        <router-link
          :to="{ name: 'admin' }"
          class="font-bold text-red-500 transition duration-300 hover:text-red-600"
        >
          <i class="pi pi-wrench me-1"></i>Administration panel
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'profile.settings' }"
          class="font-bold text-blue-500 transition duration-300 hover:text-blue-600"
        >
          <i class="pi pi-cog me-1"></i>Settings
        </router-link>
      </div>
    </div>
  </div>
  <div class="card rounded-lg bg-white p-4">Block #1</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
const authStore = useAuthStore()
</script>
