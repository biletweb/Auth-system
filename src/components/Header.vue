<template>
  <header class="bg-blue-500 p-4 text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div>
          <HeaderLogo />
        </div>
        <div>
          <HeaderLeftMenuItem />
        </div>
      </div>
      <div>
        <HeaderRightMenuItem />
      </div>
    </div>
  </header>
</template>

<script setup>
import HeaderLogo from '@/components/HeaderLogo.vue'
import HeaderRightMenuItem from '@/components/HeaderRightMenuItem.vue'
import HeaderLeftMenuItem from '@/components/HeaderLeftMenuItem.vue'
</script>
