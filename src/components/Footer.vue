<template>
  <footer class="rounded-t-lg bg-blue-500 py-4 text-white dark:bg-slate-800 dark:text-slate-400">
    <div class="text-center text-lg">© {{ currentYear }}, {{ $t('All rights reserved') }}</div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
