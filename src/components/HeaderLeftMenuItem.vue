<template>
  <ul class="flex gap-4">
    <li class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'home' }" class="text-lg">
        <i class="pi pi-home me-1"></i>Home
      </router-link>
    </li>
    <li class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'about' }" class="text-lg">
        <i class="pi pi-info-circle me-1"></i>About
      </router-link>
    </li>
  </ul>
</template>
