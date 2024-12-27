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

  <table class="w-full border-collapse overflow-hidden rounded-lg border border-slate-400 bg-white text-sm shadow">
    <thead class="bg-slate-50">
      <tr>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Name') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Surname') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Email') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Role') }}</th>
        <th class="border border-slate-300 p-4 text-left font-semibold text-slate-900">{{ $t('Registered') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-slate-300 p-4 text-slate-500">Игорь</td>
        <td class="border border-slate-300 p-4 text-slate-500">Билет</td>
        <td class="border border-slate-300 p-4 text-slate-500">test@gmail.com</td>
        <td class="border border-slate-300 p-4 text-slate-500">admin</td>
        <td class="border border-slate-300 p-4 text-slate-500">25.01.2023 10:00</td>
      </tr>
      <tr>
        <td class="border border-slate-300 p-4 text-slate-500">Вероника</td>
        <td class="border border-slate-300 p-4 text-slate-500">Давыдова</td>
        <td class="border border-slate-300 p-4 text-slate-500">test2@gmail.com</td>
        <td class="border border-slate-300 p-4 text-slate-500">user</td>
        <td class="border border-slate-300 p-4 text-slate-500">25.01.2023 12:34</td>
      </tr>
    </tbody>
  </table>
</template>
