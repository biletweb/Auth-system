<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="container mx-auto flex min-h-screen flex-col">
    <Header />

    <main class="flex-grow">
      <div class="my-4">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>
