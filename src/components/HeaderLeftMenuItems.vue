<template>
  <nav>
    <ul class="flex items-center gap-4">
      <li class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link :to="{ name: 'home' }" class="text-lg"><i class="pi pi-home me-1"></i>{{ $t('Home') }}</router-link>
      </li>
      <li class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link :to="{ name: 'about' }" class="text-lg"><i class="pi pi-info-circle me-1"></i>{{ $t('About') }}</router-link>
      </li>
      <li class="transition duration-300 hover:text-slate-300 dark:text-slate-400">
        <router-link :to="{ name: 'contacts' }" class="text-lg">
          <i class="pi pi-address-book me-1"></i>{{ $t('Contacts') }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
