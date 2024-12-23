<template>
  <div>Hello {{ authStore.user?.name }}</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
</script>
