<template>
  <footer class="bg-gray-500 py-4 text-white">
    <p class="text-center">© {{ currentYear }}, Все права защищены</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
