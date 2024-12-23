<template>
  <div class="mb-4 flex items-center justify-between">
    <div class="text-3xl font-bold">Profile</div>
    <div>
      <router-link
        :to="{ name: 'admin' }"
        class="font-bold text-red-500 transition duration-300 hover:text-red-600"
      >
        <i class="pi pi-wrench me-1"></i>Administration panel
      </router-link>
    </div>
  </div>
  <div class="card rounded-lg bg-white p-4">
    <div v-if="!authStore.user" class="flex justify-center">
      <Spinner class="w-10 rounded-full bg-blue-500 p-1" />
    </div>
    <span v-else class="text-xl"
      >Hello <span class="font-bold">{{ authStore.user?.name }}</span
      >, you are logged in. Email to contact you:
      <span class="font-bold">{{ authStore.user?.email }}</span></span
    >
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'
import Spinner from '@/components/Spinner.vue'

const authStore = useAuthStore()
</script>
