<template>
  <footer class="rounded-t-lg bg-slate-500 py-4 text-white dark:bg-slate-800 dark:text-slate-400">
    <div class="text-center text-lg">
      © 2024-{{ currentYear }} biletweb.
      <a href="/LICENSE.txt" target="_blank" class="hover:text-slate-300 hover:underline dark:text-slate-400">
        {{ $t('License') }} MIT </a
      >. {{ $t('Version:') }} {{ appVersion }}
    </div>
  </footer>
</template>

<script setup>
import version from '../../package.json'
const currentYear = new Date().getFullYear()

const appVersion = version.version
</script>
