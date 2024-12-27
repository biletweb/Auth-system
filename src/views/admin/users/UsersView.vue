<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-3xl font-bold">{{ $t('Users') }}</span>
    </div>
    <div class="flex items-center">
      <router-link
        :to="{ name: 'admin' }"
        class="flex items-center font-bold text-blue-500 transition duration-300 hover:text-blue-600"
      >
        <i class="pi pi-step-backward me-1"></i>{{ $t('Menu') }}
      </router-link>
    </div>
  </div>
</template>
