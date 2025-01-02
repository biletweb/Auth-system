<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold text-red-500 dark:text-rose-500">{{ $t('Administration panel') }}</span>
    </div>
    <div class="flex items-center gap-4">
      <MenuItems />
    </div>
  </div>
  <div>
    <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
      <div>
        <p class="dark:text-slate-400">Profit</p>

        <p class="text-2xl font-medium text-gray-900">$240.94</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuItems from '@/components/admin/MenuItems.vue'
</script>
