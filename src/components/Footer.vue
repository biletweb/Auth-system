<template>
  <footer class="rounded-t-lg bg-gray-500 py-4 text-white">
    <p class="text-center text-lg">© {{ currentYear }}, {{ $t('All rights reserved') }}</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
