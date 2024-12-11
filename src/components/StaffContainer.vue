<template>
  <StaffTable
      :staff="staff"
      @open-edit-modal="openEditModal"
      @open-delete-modal="openDeleteModal"
  />
  <button
      class="btn"
      @click="openModal"
  >
    {{ `Add ${label}` }}
  </button>
  <Modal
      :title="title"
      :show="isModalOpen"
      @close="closeModal"
  >
    <StaffForm
        v-if="selectedStaffMember && isEditMode"
        :selected-staff-member="selectedStaffMember"
        :is-edit-mode="isEditMode"
        @close="closeModal"
        @afterLeave="clearSelectedStaffMember"
        @submit-form="submitForm"
    />
    <StaffForm
        v-else
        :is-edit-mode="isEditMode"
        @close="closeModal"
        @afterLeave="clearSelectedStaffMember"
        @submit-form="submitForm"
    />
  </Modal>
  <Modal
      :show="isDeleteModalOpen"
      title="Are you sure you want to delete this Staff Member?"
      @close="closeDeleteModal"
      @afterLeave="clearSelectedStaffMember"
  >
    <ConfirmDelete
        v-if="selectedStaffMember"
        :selected-staff-member="selectedStaffMember"
        @close="closeDeleteModal"
        @confirm="deleteStaffMember"
    />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import { StaffMemberSchema, NewStaffMemberSchema } from '../types/staff.ts';
import StaffTable from "./StaffTable.vue";
import Modal from "../components/Modal.vue";
import StaffForm from "./StaffForm.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";

const props = defineProps({
  position: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const store = useStore();
const staff = computed(() => store.state.staff
    .filter((staffMember: StaffMemberSchema) => staffMember.position === props.position));

const isModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const selectedStaffMember = ref<StaffMemberSchema | null>(null);
const isEditMode = ref<boolean>(false);
const title = computed(() => isEditMode.value ? "Update Staff Member" : `Add ${props.label}`);

const openModal = () => {
  isModalOpen.value = true;
  isEditMode.value = false;
}
const closeModal = () => {
  isModalOpen.value = false;
};
const openEditModal = (staffMember: StaffMemberSchema) => {
  selectedStaffMember.value = staffMember;
  isModalOpen.value = true;
  isEditMode.value = true;
}
const openDeleteModal = (staffMember: StaffMemberSchema) => {
  selectedStaffMember.value = staffMember;
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
}
const clearSelectedStaffMember = () => {
  selectedStaffMember.value = null;
}

const submitForm = (staffMember: StaffMemberSchema) => {
  if (isEditMode.value) {
    updateStaffMember(staffMember);
  } else {
    createStaffMember(staffMember);
  }
  closeModal();
};
const createStaffMember = (newStaffMember: NewStaffMemberSchema) => {
  const uniqueId = Date.now();
  store.dispatch('createStaffMember', {
    ...newStaffMember,
    id: uniqueId,
    position: props.position
  });
};
const updateStaffMember = (updatedStaffMember: StaffMemberSchema) => {
  store.dispatch('updateStaffMember', updatedStaffMember);
};
const deleteStaffMember = () => {
  if (selectedStaffMember.value && selectedStaffMember.value.id) {
    store.dispatch('deleteStaffMember', selectedStaffMember.value.id);
  }
  closeDeleteModal();
};
</script>