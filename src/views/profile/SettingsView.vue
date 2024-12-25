<template>
  <div class="mb-4 flex items-center justify-between">
    <span class="text-3xl font-bold">Settings</span>
    <Spinner v-if="!authStore.user" class="w-7 rounded-full bg-blue-500 p-1" />
    <span v-else class="text-xl font-bold">{{ authStore.user.email }}</span>
  </div>
  <div v-if="!isEmailVerified" class="my-4 rounded-lg bg-amber-300 p-4 font-bold text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <i class="pi pi-info-circle me-2" style="font-size: 1.5rem"></i>
        Please confirm your email. We have sent a security code to the address you provided.
      </div>
      <div>
        <button class="transition duration-300 hover:text-blue-500">Resend security code</button>
      </div>
    </div>
    <div class="mt-4 flex w-52 gap-4">
      <div>
        <input
          type="text"
          name="code"
          id="code"
          placeholder="Code"
          class="w-full rounded-lg border p-2 font-normal text-black focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div class="align-bottom">
        <button
          class="rounded-lg bg-blue-500 px-4 py-2 font-normal text-white transition duration-300 hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <ChangePassword />
    <UpdatePersonalInfo />
    <div class="col-span-2">
      <DeleteAccount />
    </div>
  </div>
</template>

<script setup>
import ChangePassword from '@/components/profile/settings/ChangePassword.vue'
import UpdatePersonalInfo from '@/components/profile/settings/UpdatePersonalInfo.vue'
import DeleteAccount from '@/components/profile/settings/DeleteAccount.vue'
import Spinner from '@/components/Spinner.vue'
import { useAuthStore } from '@/stores/authStore.js'
import { watch, ref } from 'vue'

const authStore = useAuthStore()
const isEmailVerified = ref(true)

watch(
  () => authStore.user,
  (newValue) => {
    if (newValue) {
      isEmailVerified.value = authStore.user.email_verified_at
    }
  },
  { immediate: true },
)
</script>
