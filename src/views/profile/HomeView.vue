<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold">{{ $t('Profile') }}</span>
    </div>
    <div class="flex items-center gap-4">
      <MenuItem />
    </div>
  </div>
</template>

<script setup>
import MenuItem from '@/components/profile/MenuItem.vue'
</script>
