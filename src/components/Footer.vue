<template>
  <footer class="rounded-t-lg bg-slate-500 py-4 text-white">
    <div class="text-center text-lg">© {{ currentYear }}, {{ $t('All rights reserved') }}</div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
