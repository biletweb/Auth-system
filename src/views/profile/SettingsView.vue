<template>
  <div class="mb-4">
    <span class="text-3xl font-bold">Settings</span>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <ChangePassword />
    <UpdatePersonalInformation />
    <div class="col-span-2">
      <DeleteAccount />
    </div>
  </div>
</template>

<script setup>
import ChangePassword from '@/components/profile/settings/ChangePassword.vue'
import UpdatePersonalInformation from '@/components/profile/settings/UpdatePersonalInformation.vue'
import DeleteAccount from '@/components/profile/settings/DeleteAccount.vue'
</script>
