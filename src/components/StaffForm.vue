<template>
  <form @submit.prevent="submitForm">
    <div class="space-y-12">
      <div class="border-b border-gray-200 pb-4">
        <div class="mt-10 flex flex-col gap-2">
          <div class="relative pb-8">
            <label for="fullName" class="block text-sm font-medium">Full Name</label>
            <div class="mt-2">
              <input
                  v-model="staffMember.fullName"
                  type="text"
                  name="fullName"
                  id="fullName"
                  @blur="validateField('fullName')"
                  class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus-visible:outline-none sm:text-sm"
              >
            </div>
            <p v-if="errors.fullName" class="absolute bottom-1 text-sm text-red-600">
              {{ errors.fullName }}
            </p>
          </div>

          <div class="mb-4">
            <label for="isHead" class="block text-sm font-medium">Is Head of Department</label>
            <div class="mt-2 flex items-center">
              <input
                  v-model="staffMember.isHead"
                  type="checkbox"
                  name="isHead"
                  id="isHead"
                  class="h-4 w-4 rounded"
              >
              <label for="isHead" class="ml-3 text-sm text-gray-600">
                {{ staffMember.isHead ? 'Yes' : 'No' }}
              </label>
            </div>
          </div>

          <div v-if="isDepartmentVisible" class="relative pb-8">
            <label for="departmentId" class="block text-sm font-medium">Department</label>
            <div class="mt-2">
              <select
                  v-model="staffMember.departmentId"
                  id="departmentId"
                  name="departmentId"
                  @blur="validateField('departmentId')"
                  class="block w-full rounded-md border-0 p-2 text-gray-900 capitalize shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus-visible:outline-none sm:text-sm">
                <option disabled :value="null">Select a department</option>
                <option
                    v-for="department in departments"
                    :key="department.id"
                    :value="department.id"
                >
                  {{ DepartmentLabel[department.id] }}
                </option>
              </select>
            </div>
            <p v-if="errors.departmentId" class="absolute bottom-1 text-sm text-red-600">
              {{ errors.departmentId }}
            </p>
          </div>

          <div v-if="isPositionVisible" class="relative pb-8">
            <label for="position" class="block text-sm font-medium">Position</label>
            <div class="mt-2">
              <select
                  v-model="staffMember.position"
                  id="position"
                  name="position"
                  @blur="validateField('position')"
                  class="block w-full rounded-md border-0 p-2 text-gray-900 capitalize shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus-visible:outline-none sm:text-sm">
                <option disabled :value="null">Select position</option>
                <option
                    v-for="position in positions"
                    :key="position"
                    :value="position"
                >
                  {{ PositionLabel[position as Position] }}
                </option>
              </select>
            </div>
            <p v-if="errors.position" class="absolute bottom-1 text-sm text-red-600">
              {{ errors.position }}
            </p>
          </div>
        </div>
      </div>
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
          class="btn"
      >
        Save
      </button>
    </div>
  </form>
</template>


<script setup lang="ts">
import { computed, onMounted, PropType, reactive, ref } from "vue";
import { useRoute } from 'vue-router';
import { StaffMemberSchema } from '../types/staff.ts';
import { DepartmentSchema } from "../types/department.ts";
import { DepartmentLabel } from "../constants/departments.ts";
import { Position, PositionLabel } from "../constants/positions.ts";
import departmentsData from '../data/departments.json';

const props = defineProps({
  selectedStaffMember: {
    type: Object as PropType<StaffMemberSchema>,
    default: null
  },
  isEditMode: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['close', 'submitForm']);

const route = useRoute();

const positions = Object.keys(PositionLabel);
const departments = ref<DepartmentSchema[]>([]);

const isPositionVisible = computed(() => {
  const routeName = route.name as string | undefined;
  return routeName ? !Object.keys(Position).includes(routeName) : true;
});
const isDepartmentVisible = computed(() => {
  const routeName = route.name as string | undefined;
  return routeName ? !Object.values(DepartmentLabel).includes(routeName) : true;
});

const staffMember = reactive<{
  fullName: string | null,
  isHead: boolean,
  departmentId: number | null,
  position: string | null
}>({
  fullName: null,
  isHead: false,
  departmentId: null,
  position: null
})
const errors = reactive<{
  fullName: string | null,
  departmentId: string | null,
  position: string | null
}>({
  fullName: null,
  departmentId: null,
  position: null
});

const closeModal = () => {
  emit('close');
}

const submitForm = () => {
  if (!validateForm()) return;
  const form = {
    ...(props.isEditMode ? { ...props.selectedStaffMember } : {}),
    fullName: staffMember.fullName,
    isHead: staffMember.isHead,
    departmentId: staffMember.departmentId,
    position: staffMember.position,
  };
  emit('submitForm', form);
};

const validateField = (field: keyof typeof errors) => {
  errors[field] = validate(field);
};

const validateForm = () => {
  Object.keys(errors).forEach((field) => {
    const key = field as keyof typeof errors;
    errors[key] = validate(key);
  });
  return Object.values(errors).every((value) => value === null);
};

const validate = (field: keyof typeof errors) => {
  switch (field) {
    case 'fullName':
      return staffMember.fullName ? null : 'Please enter full name';
    case 'position':
      return isPositionVisible.value && !staffMember.position
          ? 'Please select position'
          : null;
    case 'departmentId':
      return isDepartmentVisible.value && !staffMember.departmentId
          ? 'Please select department'
          : null;
    default:
      return null;
  }
};

onMounted(() => {
  const data = localStorage.getItem('departments');
  departments.value = data ? JSON.parse(data) : departmentsData;

  if (props.selectedStaffMember && props.isEditMode) {
    staffMember.fullName = props.selectedStaffMember.fullName;
    staffMember.isHead = props.selectedStaffMember.isHead;
    staffMember.departmentId = props.selectedStaffMember.departmentId;
    staffMember.position = props.selectedStaffMember.position;
  }
});
</script>