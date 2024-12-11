<template>
  <div v-if="selectedStaffMember" class="mt-4 text-sm text-center text-gray-900">
    <p class="p-2">
      <strong>Name:</strong> {{ selectedStaffMember.fullName }}
    </p>
    <p class="p-2">
      <strong>Position:</strong> {{ PositionLabel[selectedStaffMember.position as keyof typeof PositionLabel] }}
    </p>
    <p class="p-2 capitalize">
      <strong>Department:</strong> {{ DepartmentLabel[selectedStaffMember.departmentId] }}
    </p>
  </div>
  <div class="mt-6 flex items-center justify-center gap-4">
    <button
        type="button"
        class="btn btn-secondary"
        @click="closeModal"
    >
      Cancel
    </button>
    <button
        type="submit"
        class="btn btn-danger"
        @click="confirmDelete"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { StaffMemberSchema } from '../types/staff.ts';
import { PositionLabel } from "../constants/positions.ts";
import { DepartmentLabel } from "../constants/departments.ts";

defineProps({
  selectedStaffMember: {
    type: Object as PropType<StaffMemberSchema>,
    default: null
  },
})
const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};
const confirmDelete = () => {
  emit('confirm');
};
</script>