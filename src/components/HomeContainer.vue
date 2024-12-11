<template>
  <nav>
    <menu>
      <li
          v-for="department in departments"
          :key="department.id"
          class="p-4 text-accent font-semibold capitalize text-xl hover:text-primary duration-300"
      >
        <RouterLink :to="{ name: department.name }">
          {{ DepartmentLabel[department.id] }} Department
        </RouterLink>
      </li>
    </menu>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import departmentsData from '../data/departments.json';
import { DepartmentLabel } from "../constants/departments.ts";
import { DepartmentSchema } from "../types/department.ts";

const departments = ref<DepartmentSchema[]>([]);

onMounted(() => {
  const data = localStorage.getItem('departments');
  departments.value = data ? JSON.parse(data) : departmentsData;
})
</script>
