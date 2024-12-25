<template>
  <div class="mb-4">
    <span class="text-3xl font-bold">Settings</span>
  </div>
  <ChangePassword />
  <UpdatePersonalInformation />
</template>

<script setup>
import ChangePassword from '@/components/profile/settings/ChangePassword.vue'
import UpdatePersonalInformation from '@/components/profile/settings/UpdatePersonalInformation.vue'
</script>
