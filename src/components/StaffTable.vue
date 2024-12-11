<template>
  <p class="p-4" v-if="!staff.length">No Staff Members to show</p>
  <div v-else class="overflow-auto max-w-[90vw] max-h-[50vh] bg-white shadow rounded-lg mb-6">
    <table class="w-full table-auto text-left text-sm text-gray-600">
      <thead class="bg-primary text-white">
      <tr>
        <th class="p-4 font-semibold whitespace-nowrap">Full Name</th>
        <th class="p-4 font-semibold whitespace-nowrap">Position</th>
        <th class="p-4 font-semibold whitespace-nowrap">Role</th>
        <th class="p-4 font-semibold whitespace-nowrap">Department</th>
        <th class="p-4 font-semibold whitespace-nowrap">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="staffMember in staff"
          :key="staffMember.id"
          class="border-b hover:bg-gray-100"
      >
        <td class="p-4 whitespace-nowrap">{{ staffMember.fullName }}</td>
        <td class="p-4 whitespace-nowrap">{{ PositionLabel[staffMember.position as keyof typeof PositionLabel] }}</td>
        <td class="p-4 whitespace-nowrap">{{ staffMember.isHead ? 'Head of Department' : 'Staff Member' }}</td>
        <td class="p-4 whitespace-nowrap capitalize">
          <RouterLink :to="{ name: DepartmentLabel[staffMember.departmentId] }">
            {{ DepartmentLabel[staffMember.departmentId] }}
          </RouterLink>
        </td>
        <td class="p-4 whitespace-nowrap">
          <span class="flex gap-4">
            <button
                class="text-primary"
                @click="$emit('openEditModal', staffMember)"
            >
            Edit
          </button>
          <button
              class="text-red-600"
              @click="$emit('openDeleteModal', staffMember)"
          >
            Delete
          </button>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { StaffMemberSchema } from '../types/staff.ts';
import { PositionLabel } from "../constants/positions.ts";
import { DepartmentLabel } from "../constants/departments.ts";

defineProps({
  staff: {
    type: Array as PropType<StaffMemberSchema[]>,
    required: true,
  },
});
defineEmits(['openEditModal', 'openDeleteModal']);
</script>