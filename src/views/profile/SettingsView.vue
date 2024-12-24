<template>
  <div class="mb-4">
    <span class="text-3xl font-bold">Settings</span>
  </div>
  <div class="card rounded-lg bg-white p-4">
    <span class="text-xl font-bold">New password</span>
    <form @submit.prevent="">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative my-4">
          <label for="password">Password<sup class="ms-1 text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-key"></i>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="relative my-4">
          <label for="password_confirmation">
            Password confirmation<sup class="ms-1 text-red-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[34px] text-gray-400">
            <i class="pi pi-key"></i>
          </div>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Password confirmation"
            class="w-full rounded-lg border p-2 pl-8 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          <span>Change password</span>
        </button>
      </div>
    </form>
  </div>
</template>
