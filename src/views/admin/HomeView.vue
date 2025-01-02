<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold text-red-500 dark:text-rose-500">{{ $t('Administration panel') }}</span>
    </div>
    <div class="flex items-center gap-4">
      <MenuItems />
    </div>
  </div>
  <div class="my-4 grid grid-cols-2 gap-4">
    <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
      <div>
        <p class="dark:text-slate-200">{{ $t('Users') }}</p>
        <p class="text-2xl font-medium dark:text-cyan-500">85</p>
      </div>
    </div>
    <div class="card rounded-lg border bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
      <div>
        <p class="dark:text-slate-200">{{ $t('Administrators') }}</p>
        <p class="text-2xl font-medium dark:text-cyan-500">7</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuItems from '@/components/admin/MenuItems.vue'
</script>
