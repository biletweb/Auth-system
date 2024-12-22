<template>
  <header class="bg-blue-500 py-4 text-white">
    <div class="flex items-center justify-between">
      <div class="ms-4 size-10">
        <HeaderLogo />
      </div>
      <div class="me-4">
        <HeaderMenuItem />
      </div>
    </div>
  </header>
</template>

<script setup>
import HeaderLogo from '@/components/HeaderLogo.vue'
import HeaderMenuItem from '@/components/HeaderMenuItem.vue'
</script>
