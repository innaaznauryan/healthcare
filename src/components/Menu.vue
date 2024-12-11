<template>
  <div class="text-3xl font-bold tracking-tight">
    <RouterLink
        :to="{ name: 'home' }"
        class="hover:text-accent transition duration-300"
    >
      Welcome
    </RouterLink>
  </div>
  <nav class="flex gap-x-2 md:gap-x-4 lg:gap-x-8">
    <RouterLink
        :to="{ name: 'home' }"
        class="font-medium hover:text-accent transition duration-300"
        :class="{ 'text-accent': $route.name === 'home' }"
    >
      Departments
    </RouterLink>
    <RouterLink
        :to="{ name: 'doctor' }"
        class="font-medium hover:text-accent transition duration-300"
        :class="{ 'text-accent': $route.name === 'doctor' }"
    >
      Doctors
    </RouterLink>
    <RouterLink
        :to="{ name: 'nurse' }"
        class="font-medium hover:text-accent transition duration-300"
        :class="{ 'text-accent': $route.name === 'nurse' }"
    >
      Nurses
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">

</script>