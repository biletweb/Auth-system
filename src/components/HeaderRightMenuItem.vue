<template>
  <ul class="flex gap-4">
    <li v-if="authStore.access_token" class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'admin' }">Admin</router-link>
    </li>
    <li class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </li>
    <li class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'register' }">Register</router-link>
    </li>
  </ul>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
</script>
