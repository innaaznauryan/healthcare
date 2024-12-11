<template>
  <div class="bg-secondary text-white py-4 shadow-md w-full fixed top-0 left-0 z-40">
    <div class="container mx-auto px-2 sm:px-0 flex justify-between items-center gap-2">
      <Menu />
    </div>
  </div>

  <main class="py-8">
    <h1
        v-if="$route.name !== 'home'"
        class="pb-8 pt-20 capitalize font-semibold"
    >
      {{ $route.meta.title }}
    </h1>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import staff from './data/staff.json';
import departments from './data/departments.json';
import Menu from "./components/Menu.vue";

onMounted(() => {
  if (!localStorage.getItem('staff')) {
    localStorage.setItem('staff', JSON.stringify(staff));
  }
  if (!localStorage.getItem('departments')) {
    localStorage.setItem('departments', JSON.stringify(departments));
  }
})
</script>
