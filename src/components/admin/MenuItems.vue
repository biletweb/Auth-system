<template>
  <router-link
    :to="{ name: 'admin.users' }"
    class="flex items-center font-semibold text-blue-500 transition duration-300 hover:text-blue-600 dark:text-indigo-500 dark:hover:text-indigo-400"
  >
    <i class="pi pi-users me-1"></i>{{ $t('Users') }}
  </router-link>
</template>
