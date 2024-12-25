<template>
  <div class="mb-4">
    <span class="text-3xl font-bold">Settings</span>
  </div>
  <ChangePassword />
  <UpdatePersonalInformation />
  <DeleteAccount />
</template>

<script setup>
import ChangePassword from '@/components/profile/settings/ChangePassword.vue'
import UpdatePersonalInformation from '@/components/profile/settings/UpdatePersonalInformation.vue'
import DeleteAccount from '@/components/profile/settings/DeleteAccount.vue'
</script>
