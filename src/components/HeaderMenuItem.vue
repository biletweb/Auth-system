<template>
  <ul class="flex gap-4">
    <li class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'home' }">Home</router-link>
    </li>
    <li class="transition duration-300 hover:text-gray-300">
      <router-link :to="{ name: 'about' }">About</router-link>
    </li>
  </ul>
</template>
