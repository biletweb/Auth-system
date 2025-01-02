<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold text-red-500 dark:text-rose-500">{{ $t('Administration panel') }}</span>
    </div>
    <div class="flex items-center gap-4">
      <MenuItems />
    </div>
  </div>
  <div class="my-4 grid grid-cols-3 gap-4">
    <DashboardInfo />
  </div>
</template>

<script setup>
import MenuItems from '@/components/admin/MenuItems.vue'
import DashboardInfo from '@/components/admin/DashboardInfo.vue'
</script>
