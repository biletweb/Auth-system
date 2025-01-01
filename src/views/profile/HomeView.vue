<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold dark:text-white">{{ $t('Profile') }}</span>
    </div>
    <div class="flex items-center gap-4">
      <MenuItems />
    </div>
  </div>
</template>

<script setup>
import MenuItems from '@/components/profile/MenuItems.vue'
</script>
